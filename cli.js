#!/usr/bin/env node

let yargs = require('yargs')

let positionalInput = command => _ => {
  yargs.positional('input', {
    describe: 'file or directory to use as input for your custom element',
    type: 'string',
  })
  yargs.usage(`$0 ${command} <input> [options]`)
}

let argv = yargs
  .usage('$0 <command> <input> [options]')
  .command('build', 'build a custom element', positionalInput('build'))
  .command('watch', 'watch a file or folder and re-build on chages', positionalInput('watch'))
  .command('demo', 'create a demo HTML page', positionalInput('demo'))
  .demandCommand(1, 'please supply a command as the first argument')
  .option('bundle', {
    alias: 'b',
    default: false,
    describe: 'bundle output when building multiple elements at once',
    type: 'boolean',
  })
  .option('minify', {
    alias: 'm',
    default: false,
    describe: 'squish your output',
    type: 'boolean',
  })
  .option('output', {
    alias: 'o',
    default: 'dist',
    describe: 'where the output files should go',
    type: 'string',
  })
  .option('preprocessor', {
    alias: 'p',
    describe: 'CSS preprocessor to use',
    type: 'string',
  })
  .choices('preprocessor', ['postcss', 'scss', 'sass'])
  .help()
  .argv

let command = argv._[0]
let input = argv._[1]
let options = {
  bundle: argv.bundle,
  input: input,
  outputFolder: argv.output,
  minify: argv.minify,
  preprocessor: argv.preprocessor,
}

if (!input) {
  console.error(`Please specify an input file or folder to ${command}.`)
  console.error(`Try running a command like this:\n${argv.$0} ${command} src/my-element.html\n`)
  console.error('Usage:')
  yargs.showHelp()
  process.exit(1)
}

switch (command) {
case 'build':
  require('./build')(options)
  break

case 'demo':
  require('./lib/demo-page')(options)
  break

case 'watch':
  let inputIsDirectory
  let fail = require('./lib/fail')

  try {
    let inputStats = require('fs').statSync(input)

    inputIsDirectory = inputStats.isDirectory()
    if (!inputIsDirectory && !inputStats.isFile()) {
      // Stop the process immediately if the input isn't a file or directory. It could be a socket, I suppose.
      fail(`Input ${input} is neither a file nor directory. So I dunno what to do with it.`)
    }
  } catch (error) {
    // Stop the process immediately if the input file or directory does not exist.
    fail(`Could not stat input file or directory, ${input}`)
  }

  // TODO for issue 31,
  // check for .scss files or .sass files, then get a sass import graph
  // and, in addition to the input, have chokidar watch the entire array of imports
  // A nice-to-have feature would also be to update the graph when any sass file changes,
  // which might mean calling .close() the current watcher and making a new one.
  // Gotta account for easy-element trying to build a partial that's changed in the directory
  // we are watching.
  let reportError = error => {
    console.error(`Error while watching ${input}`, error)
    process.stderr.write('\x07') // System bell sound
  }

  // Make further failures report errors instead of killing the watch process.
  fail.reportMode(reportError)
  let rebuild = _ => {
    console.error(`Building ${input} to ${argv.output}`)
    try {
      return require('./build')(options)
        .catch(error => reportError(error.message))
    } catch (error) {
      reportError(error.message)
      return Promise.reject(error)
    }
  }
  let watch = require('./lib/watch')
  let importsToWatch = require('./lib/imports-to-watch')
  let watcher
  // let watcher = require('chokidar').watch(input, {persistent: true})
  // Provide the result from watcher.getWatched() for the first parameter.
  let cachedNotYetWatched = watched => filePath => {
    let path = require('path')
    let fileDir = path.dirname(filePath)
    let fileBase = path.basename(filePath)
    let watchedDir = watcher.getWatched()[fileDir]

    if (watchedDir) {
      return !watchedDir.includes(fileBase)
    }

    return true
  }
  let notYetWatched = filePath => cachedNotYetWatched(watcher.getWatched())(filePath)
  let startWatcher = () => importsToWatch(input, inputIsDirectory, fail)
    .then(importMap => {
      let toWatch = Object.keys(importMap).concat([input])

      watcher = require('chokidar').watch(toWatch, {persistent: true})
      getImportMap.importMap = importMap
    })
    .catch(fail)
  // Here it gets wonky.
  // Because updating the watcher can be expensive, depending on how many elements we're building,
  // we need to do that off the main thread.
  // We also need a way to update the importMap so the watcher event listeners like onChange
  // can pull in the newness should the import structure change.
  let getImportMap = () => getImportMap.importMap || {}
  let updateWatcher = () => {
    if (!updateWatcher.isRunning) {
      updateWatcher.isRunning = true

      let pathsToWatch = []

      return importsToWatch(input, inputIsDirectory, fail)
        .then(importMap => {
          let watched = watcher.getWatched()

          getImportMap.importMap = importMap
          pathsToWatch = Object.keys(importMap)
            .filter(cachedNotYetWatched(watched))

          if (pathsToWatch.length) {
            watcher.add(pathsToWatch)
          }
        })
        .catch(fail)
        .then(() => {
          if (pathsToWatch.length) {
            // Give the onAdd event listener a chance to run and do nothing.
            setTimeout(() => {
              updateWatcher.isRunning = false
            }, 100)
          } else {
            // Do it immediately
            updateWatcher.isRunning = false
          }
        })
    }

    return Promise.resolve()
  }

  watch.nodeVersionCheck()

  startWatcher().then(() => {
    watcher.on('add', watch.onAdd(options, inputIsDirectory, getImportMap, rebuild, notYetWatched, updateWatcher))
    watcher.on('change', watch.onChange(options, inputIsDirectory, getImportMap, rebuild, updateWatcher))
    watcher.on('ready', watch.onReady(options, inputIsDirectory, rebuild))
    watcher.on('unlink', rebuild)
    watcher.on('error', reportError)
  })
  break

default:
  yargs.showHelp()
}
