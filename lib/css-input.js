// Returns a Promise.
// Make sure to stat input before running this.
module.exports = (stylesText, tagName, options) => {
  let {input, preprocessor} = options

  return resolveStylesText(stylesText, input, preprocessor)
    .then(resolvedStylesText => {
      if (resolvedStylesText) {
        let parseStyles = parse(tagName, preprocessor)

        if (preprocessor) {
          return require('./preprocess-css')(preprocessor, resolvedStylesText, input)
            .then(parseStyles)
        }

        return parseStyles(resolvedStylesText)
      }

      return null
    })
    .catch(error => require('./fail')(error))
}

let parse = (tagName, preprocessor) => stylesText => {
  try {
    let css = require('css')

    return {
      stringify: css.stringify,
      stylesObject: css.parse(stylesText),
      stylesText: stylesText,
    }
  } catch (error) {
    let errorLines = error.source.split('\n')
    let chalk = require('chalk')
    let errorMessages = [
      `Error parsing CSS for ${tagName} at line ${error.line}, column ${error.column}: ${error.reason}.\n`,
      chalk.white(errorLines[error.line - 4] || ''),
      chalk.white(errorLines[error.line - 3] || ''),
      chalk.white(errorLines[error.line - 2] || ''),
      chalk.red(errorLines[error.line - 1]), // the offending line,
      chalk.white(errorLines[error.line] || ''),
      chalk.white(errorLines[error.line + 1] || ''),
      chalk.white(errorLines[error.line + 2] || ''),
      '\n',
    ]

    if (!preprocessor) {
      errorMessages.push(`You did not specify a CSS preprocessor for ${tagName}. Could that be the problem?\n`)
    }

    require('./fail')(errorMessages)
  }
}

// Returns a promise regardless of whether stylesText exist.
let resolveStylesText = (stylesText, input, preprocessor) => {
  if (stylesText) {
    return Promise.resolve(stylesText)
  }

  if (shouldReadInputFile(input, preprocessor)) {
    return new Promise(resolve => {
      require('fs').readFile(input, 'utf8', (_e, resolvedStylesText) => {
        // We assume there's no error reading the file because we did a stat on it above.
        resolve(resolvedStylesText)
      })
    })
  }

  return Promise.resolve(null)
}

let shouldReadInputFile = (input, preprocessor) => {
  if (input) {
    let fileExtension = require('path').extname(input)

    if (fileExtension === '.css') {
      return true
    }

    if ((preprocessor === 'sass' || preprocessor === 'scss') && (fileExtension === '.scss' || fileExtension === '.sass')) {
      return true
    }
  }

  return false
}
