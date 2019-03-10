let fs = require('fs')
let path = require('path')
let fail = require('./lib/fail')
let inputs = require('./lib/inputs')
let defaultOptions = {
  input: null,
  outputFolder: 'dist',
  preprocessor: null,
}

let buildFileGroup = (options, group) => {
  let {input, preprocessor, outputFolder} = options // Copy so we don't mutate outside variables in each iteration.
  let {className, tagName, cssInput, jsInput, htmlInput, cssStats, htmlStats, jsStats, inferredPreprocessor} = inputs.fromFileGroup(input, group)

  if (!cssStats && !jsStats && !htmlStats) {
    fail(`Expected to find an html and/or css and/or js file in directory ${input}`)
  }

  let stylesText, scriptText, innerHTML
  // The source of the styles could be a CSS file, or an HTML file.
  // Assume it might be a CSS file until further inspection.
  let stylesSource = cssStats && cssInput

  if (htmlStats) {
    let htmlParseResult = require('./lib/parse-html')(fs.readFileSync(htmlInput))

    if (htmlParseResult) {
      if (preprocessor && htmlParseResult.preprocessor && (preprocessor !== htmlParseResult.preprocessor)) {
        fail(`You specified a preprocessor of "${preprocessor}", but also specied "${htmlParseResult.preprocessor}" in ${htmlInput}. Choose only one, please!`)
      }

      stylesText = htmlParseResult.stylesText
      scriptText = htmlParseResult.scriptText
      innerHTML = htmlParseResult.innerHTML
      preprocessor = preprocessor || htmlParseResult.preprocessor

      if (stylesText && cssStats) {
        fail('Found CSS in both HTML and in a separate file. Please choose one option or the other.')
      }

      if (jsStats && scriptText) {
        fail('Found JS in both HTML and in a separate file. Please choose one option or the other.')
      }
    }

    if (!scriptText && !stylesText && !innerHTML) {
      innerHTML = fs.readFileSync(htmlInput, 'utf8')
    }

    if (stylesText && !cssStats) {
      stylesSource = htmlInput
    }
  }

  if (!scriptText && jsStats) {
    scriptText = fs.readFileSync(jsInput, 'utf8')
  }

  if (preprocessor && inferredPreprocessor && (preprocessor !== inferredPreprocessor)) {
    fail(`You specified a preprocessor of "${preprocessor}", but we inferred "${inferredPreprocessor}" based on directory contents.`)
  }

  require('./lib/css-input')(stylesText, stylesSource, preprocessor || inferredPreprocessor)
    .then(resolvedStylesText => {
      require('./lib/transform')({
        innerHTML: innerHTML,
        scriptText: scriptText,
        stylesText: resolvedStylesText,
        className: className,
        tagName: tagName,
        outputFolder: outputFolder,
      })
    })
}

let buildOneFile = (input, outputFolder, preprocessor) => {
  let fileExtension = path.extname(input.toLowerCase())

  switch (fileExtension) {
  case '.html':
    require('./lib/transform-html')(input, outputFolder, preprocessor)
    break
  case '.css':
    require('./lib/transform-css')(input, outputFolder, preprocessor)
    break
  case '.scss':
    if (preprocessor && preprocessor !== 'scss') {
      fail(`"${preprocessor}" was specified as the preprocessor, but we're trying to read a .scss file, where "scss" would be the preprocessor.`)
    }

    require('./lib/transform-css')(input, outputFolder, 'scss', fileExtension)
    break
  case '.sass':
    if (preprocessor && preprocessor !== 'sass') {
      fail(`"${preprocessor}" was specified as the preprocessor, but we're trying to read a .sass file, where "sass" would be the preprocessor.`)
    }

    require('./lib/transform-css')(input, outputFolder, 'sass', fileExtension)
    break
  case '.js':
    require('./lib/transform-js')(input, outputFolder)
    break
  default:
    fail(`Unsupported input file extension, ${fileExtension}`)
  }
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
    let directoryContents = fs.readdirSync(input)
    let fileGroups = inputs.groupFiles(directoryContents)

    Object.keys(fileGroups).forEach(basename => {
      buildFileGroup(options, fileGroups[basename])
    })
  } else {
    buildOneFile(input, outputFolder, preprocessor)
  }
}
