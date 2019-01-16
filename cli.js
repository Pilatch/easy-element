#!/usr/bin/env node

let argv = require('yargs').argv

require('./build')({
  input: argv.input || argv.i,
  outputFolder: argv.output || argv.o || 'dist',
})
