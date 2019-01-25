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
  .help()
  .argv

let command = argv._[0]
let input = argv._[1]

if (!input) {
  console.error('An input file or folder is required as the last argument.')
  console.error(`Try running a command like this:\n${argv.$0} ${command} --output dist src/my-element.html\n`)
  console.error('Usage:')
  yargs.showHelp()
  process.exit(1)
}

switch (command) {
  case 'build':
    return require('./build')({
      input: input,
      outputFolder: argv.output,
    })

  case 'demo':
    return require('./lib/demo-page')(input, argv.output)

  case 'watch':
    let watcher = require('chokidar').watch(input, {
      persistent: true,
    })
    let build = require('./build')
    let rebuild = _ => {
      console.error(`Building ${input} to ${argv.output}`)
      build({
        input: input,
        outputFolder: argv.output,
      })
    }

    watcher.on('add', rebuild)
    watcher.on('change', rebuild)
    watcher.on('unlink', rebuild)
    watcher.on('error', error => console.error(`Error while watching ${input}`, error))
    return

  default:
    yargs.showHelp()
}
