let fail = require('./fail')
let fs = require('fs')
let inputs = require('./inputs')

let buildDirectory = (options, input) => {
  return require('./recursive-readdir')(input, true, false)
    .then(paths => {
      if (paths.length === 0) {
        fail(`No .html nor .css nor .js files found in input directory.`)
      }

      let inputRelativePaths = paths
        .map(path => path.replace(input, ''))
      let fileGroups = inputs.groupFiles(inputRelativePaths)
      let transformPromises = Object.keys(fileGroups)
        .sort() // We sort to ensure a deterministic output is written.
        .map(basename => transformFileGroup(options, fileGroups[basename]))

      return Promise
        .all(transformPromises)
        .then(results => {
          if (options.bundle) {
            results = [require('./bundle')(results)]
          }

          results.forEach(writeResult(options.outputFolder, options.minify))
        })
        .catch(fail)
    })
    .catch(fail)
}

let buildFileGroup = (options, group) => transformFileGroup(options, group)
  .then(writeResult(options.outputFolder, options.minify))
  .catch(fail)

let transformFileGroup = (options, group) => {
  let {input, preprocessor} = options // Copy so we don't mutate outside variables in each iteration.
  let {className, tagName, cssInput, jsInput, htmlInput, cssStats, htmlStats, jsStats, inferredPreprocessor} = inputs.fromFileGroup(input, group)

  if (!cssStats && !jsStats && !htmlStats) {
    fail(`Expected to find an html and/or css and/or js file in directory ${input}`)
  }

  let stylesText, scriptText, innerHTML
  // The source of the styles could be a CSS file, or an HTML file.
  // Assume it might be a CSS file until further inspection.
  let stylesSource = cssStats && cssInput

  if (htmlStats) {
    let htmlParseResult = require('./parse-html')(fs.readFileSync(htmlInput))

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

  return require('./parse-css')(stylesText, tagName, {
    input: stylesSource,
    preprocessor: preprocessor || inferredPreprocessor,
  })
    .then(parsedStyles => require('./transform')({
      innerHTML: innerHTML,
      scriptText: scriptText,
      parsedStyles: parsedStyles,
      className: className,
      tagName: tagName,
      minify: options.minify,
    }))
    .catch(fail)
}

let writeResult = (outputFolder, minify) => result => {
  if (result) {
    let writeToFile = require('./write-to-file')

    writeToFile.es5(result.es5Ast, result.tagName, outputFolder, minify)
    writeToFile.es6(result.es6Ast, result.tagName, outputFolder, minify)
  }
}

let buildOneFile = options => {
  let {input, outputFolder, preprocessor} = options
  let fileExtension = require('path').extname(input.toLowerCase())

  switch (fileExtension) {
  case '.html':
    return require('./transform-html')(options)
      .then(writeResult(outputFolder, options.minify))
      .catch(fail)
  case '.css':
    return require('./transform-css')(options, fileExtension)
      .then(writeResult(outputFolder, options.minify))
      .catch(fail)
  case '.scss':
    if (preprocessor && preprocessor !== 'scss') {
      fail(`"${preprocessor}" was specified as the preprocessor, but we're trying to read a .scss file, where "scss" would be the preprocessor.`)
    }

    options.preprocessor = 'scss'

    return require('./transform-css')(options, fileExtension)
      .then(writeResult(outputFolder, options.minify))
      .catch(fail)
  case '.sass':
    if (preprocessor && preprocessor !== 'sass') {
      fail(`"${preprocessor}" was specified as the preprocessor, but we're trying to read a .sass file, where "sass" would be the preprocessor.`)
    }

    options.preprocessor = 'sass'

    return require('./transform-css')(options, fileExtension)
      .then(writeResult(outputFolder, options.minify))
      .catch(fail)
  case '.js':
    return require('./transform-js')(options)
      .then(writeResult(outputFolder, options.minify))
      .catch(fail)
  default:
    fail(`Unsupported input file extension, ${fileExtension}`)
  }
}

module.exports = {
  buildDirectory: buildDirectory,
  buildFileGroup: buildFileGroup,
  buildOneFile: buildOneFile,
}
