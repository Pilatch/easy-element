let fs = require('fs')
let path = require('path')
let defaultOptions = {
  input: null,
  outputFolder: 'dist',
  preprocessor: null,
}

module.exports = (options = defaultOptions) => {
  let {input, outputFolder, preprocessor} = options

  if (!input) {
    console.error('I can\'t do my thing without an input file or folder.')
    process.exit(1)
  }

  let inputStats = fs.statSync(input)

  if (!inputStats) {
    console.error(`Could not find input file or folder, ${input}`)
    process.exit(1)
  }

  if (inputStats.isDirectory()) {
    let { className, tagName, cssInput, jsInput, htmlInput, cssStats, htmlStats, jsStats, inferredPreprocessor } = require('./lib/inputs').fromDirectory(input)

    if (!cssStats && !jsStats && !htmlStats) {
      console.error(`Expected to find an html and/or css and/or js file in directory ${input}`)
      process.exit(1)
    }

    let stylesText, scriptText, innerHTML
    // The source of the styles could be a CSS file, or an HTML file.
    // Assume it might be a CSS file until further inspection.
    let stylesSource = cssStats && cssInput

    if (htmlStats) {
      let htmlParseResult = require('./lib/parse-html')(fs.readFileSync(htmlInput))

      if (htmlParseResult) {
        if (preprocessor && htmlParseResult.preprocessor && (preprocessor !== htmlParseResult.preprocessor)) {
          console.error(`You specified a preprocessor of "${preprocessor}", but also specied "${htmlParseResult.preprocessor}" in ${htmlInput}.`)
          process.exit(1)
        }

        stylesText = htmlParseResult.stylesText
        scriptText = htmlParseResult.scriptText
        innerHTML = htmlParseResult.innerHTML
        preprocessor = preprocessor || htmlParseResult.preprocessor

        if (stylesText && cssStats) {
          console.error('Found CSS in both HTML and in a separate file. Please choose one option or the other.')
          process.exit(1)
        }

        if (jsStats && scriptText) {
          console.error('Found JS in both HTML and in a separate file. Please choose one option or the other.')
          process.exit(1)
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
      console.error(`You specified a preprocessor of "${preprocessor}", but we inferred "${inferredPreprocessor}" based on directory contents.`)
      process.exit(1)
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
  } else {
    let fileExtension = path.extname(input.toLowerCase())

    switch (fileExtension) {
      case '.html':
        require('./lib/transform-html')(input, outputFolder, preprocessor)
        break
      case '.css':
        require('./lib/transform-css')(input, outputFolder, preprocessor)
        break
      case '.scss':
      case '.sass':
        if (preprocessor && preprocessor !== 'sass') {
          console.error(`"${preprocessor}" was specified as the preprocessor, but we're trying to read a .scss file, where "sass" would be the preprocessor.`)
          process.exit(1)
        }

        require('./lib/transform-css')(input, outputFolder, 'sass', fileExtension)
        break
      case '.js':
        require('./lib/transform-js')(input, outputFolder)
        break
      default:
        console.error(`Unsupported input file extension, ${fileExtension}`)
        process.exit(1)
    }
  }
}
