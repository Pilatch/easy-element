let fs = require('fs')
let inputs = require('./lib/inputs')
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
    let { className, tagName, cssInput, jsInput, htmlInput, cssStats, htmlStats, jsStats } = inputs.fromDirectory(input)

    if (!cssStats && !jsStats && !htmlStats) {
      console.error('Expected to find an html and/or css and/or js file in directory.')
      process.exit(1)
    }

    let stylesText, scriptText, innerHTML

    if (htmlStats) {
      let htmlParseResult = require('./lib/parse-html')(fs.readFileSync(htmlInput))

      if (htmlParseResult) {
        stylesText = htmlParseResult.stylesText
        scriptText = htmlParseResult.scriptText
        innerHTML = htmlParseResult.innerHTML

        if (stylesText && cssStats) {
          console.error('Found CSS in both HTML and in a separate file. Please choose one option or the other.')
          process.exit(1)
        }

        if (jsStats && scriptText) {
          console.error('Found JS in both HTML and in a separate file. Please choose one option or the other.')
          process.exit(1)
        }
      }
    }

    if (!scriptText && jsStats) {
      scriptText = fs.readFileSync(jsInput, 'utf8')
    }

    if (!innerHTML && htmlStats) {
      innerHTML = fs.readFileSync(htmlInput, 'utf8')
    }

    require('./lib/css-input')(stylesText, cssStats && cssInput, preprocessor)
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
      case '.js':
        require('./lib/transform-js')(input, outputFolder)
        break
      default:
        console.error(`Unsupported input file extension, ${fileExtension}`)
        process.exit(1)
    }
  }
}
