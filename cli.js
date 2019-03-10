#!/usr/bin/env node

let yargs = require('yargs')

let positionalInput = command => _ => {
  yargs.positional('input', {
    describe: 'file or directory to use as input for your custom element',
    type: 'string',
  })
  yargs.usage(`$0 ${command} [-o <output>] <input>`)
}

let argv = yargs
  .usage('$0 <command> [-o <output>] <input>')
  .command('build', 'build a custom element', positionalInput('build'))
  .command('watch', 'watch a file or folder and re-build on chages', positionalInput('watch'))
  .command('demo', 'create a demo HTML page', positionalInput('demo'))
  .demandCommand(1, 'please supply a command as the first argument')
  .option('output', {
    alias: 'o',
    default: 'dist',
    describe: 'where the output files should go',
    type: 'string',
  })
  .option('preprocessor', {
    alias: 'p',
    describe: 'CSS preprocessor to use, such as "postcss", "scss", or "sass"',
    type: 'string',
  })
  .choices('preprocessor', ['postcss', 'scss', 'sass'])
  .help()
  .argv

let command = argv._[0]
let input = argv._[1]
let options = {
  input: input,
  outputFolder: argv.output,
  preprocessor: argv.preprocessor,
}

if (!input) {
  console.error('An input file or folder is required as the last argument.')
  console.error(`Try running a command like this:\n${argv.$0} ${command} --output dist src/my-element.html\n`)
  console.error('Usage:')
  yargs.showHelp()
  process.exit(1)
}

switch (command) {
case 'build':
  require('./build')({
    input: input,
    outputFolder: argv.output,
    preprocessor: argv.preprocessor,
  })
  break

case 'demo':
  require('./lib/demo-page')(input, argv.output)
  break

case 'watch':
  let inputStats

  try {
    inputStats = require('fs').statSync(input)
  } catch (error) {
    // Stop the process immediately if the input file or directory does not exist.
    require('./lib/fail')(`Could not stat input file or directory, ${input}`)
  }

  // Make further failures throw errors instead of killing the watch process.
  require('./lib/fail').tossMode()

  let watcher = require('chokidar').watch(input, {
    persistent: true,
  })
  let reportError = error => {
    console.error(`Error while watching ${input}`, error)
    process.stderr.write('\x07') // System bell sound
  }
  let build = require('./build')
  let rebuild = _ => {
    // TODO each event type needs to be handled differently.
    // Probably need to debounce on add.
    console.error(`Building ${input} to ${argv.output}`)
    try {
      build({
        input: input,
        outputFolder: argv.output,
        preprocessor: argv.preprocessor,
      })
    } catch (error) {
      reportError(error)
    }
  }

  // watcher.on('add', rebuild) // TODO re-enable this after we have an intelligent add handler
  watcher.on('change', require('./lib/watch').onChange(build, options, reportError, inputStats))
  watcher.on('unlink', rebuild)
  watcher.on('error', reportError)
  break

default:
  yargs.showHelp()
}
