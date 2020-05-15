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

  // Make further failures throw errors instead of killing the watch process.
  fail.tossMode()

  // TODO for issue 31,
  // check for .scss files or .sass files, then get a sass import graph
  // and, in addition to the input, have chokidar watch the entire array of imports
  // A nice-to-have feature would also be to update the graph when any sass file changes,
  // which might mean calling .close() the current watcher and making a new one.
  // Gotta account for easy-element trying to build a partial that's changed in the directory
  // we are watching.
  require('./lib/imports-to-watch')(input, inputIsDirectory).then(importMap => {
    let importsToWatch = [] // TODO base this on importMap's keys!
    let filesToWatch = input // TODO make a smart watcher that re-builds the parent files in the importMap!
    let watcher = require('chokidar').watch(filesToWatch, {persistent: true})
    let reportError = error => {
      console.error(`Error while watching ${input}`, error)
      process.stderr.write('\x07') // System bell sound
    }
    let rebuild = _ => {
      console.error(`Building ${input} to ${argv.output}`)
      try {
        require('./build')(options)
          .catch(error => reportError(error.message))
      } catch (error) {
        reportError(error.message)
      }
    }

    let watch = require('./lib/watch')

    watch.nodeVersionCheck()
    watcher.on('add', watch.onAdd(options, reportError, inputIsDirectory, rebuild))
    watcher.on('change', watch.onChange(options, reportError, inputIsDirectory, importsToWatch, rebuild))
    watcher.on('ready', watch.onReady(options, reportError, inputIsDirectory, rebuild))
    watcher.on('unlink', rebuild)
    watcher.on('error', reportError)
  })
  break

default:
  yargs.showHelp()
}
