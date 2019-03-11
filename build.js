let fs = require('fs')
let fail = require('./lib/fail')
let helpers = require('./lib/build-helpers')
let defaultOptions = {
  input: null,
  outputFolder: 'dist',
  preprocessor: null,
}

module.exports = (options = defaultOptions) => {
  let {input, outputFolder, preprocessor} = options
  let inputStats

  if (!input) {
    fail('I can\'t do my thing without an input file or folder.')
  }

  try {
    inputStats = fs.statSync(input)
  } catch (_) {
    fail(`Could not find input file or folder, ${input}`)
  }

  if (inputStats.isDirectory()) {
    helpers.buildDirectory(options, input)
  } else {
    helpers.buildOneFile(input, outputFolder, preprocessor)
  }
}
