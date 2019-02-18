let fs = require('fs')

// Returns a Promise.
// Make sure to stat input before running this.
module.exports = (stylesText, input, preprocessor) => {
  return resolveStylesText(stylesText, input)
    .then(resolvedStylesText => {
      if (preprocessor) {
        return require('./preprocess-css')(preprocessor, resolvedStylesText, input)
      }

      return resolvedStylesText
    })
}

// Returns a promise regardless of whether stylesText exist.
let resolveStylesText = (stylesText, input, preprocessor) => {
  if (stylesText) {
    return Promise.resolve(stylesText)
  }

  let fileExtension = require('path').extname(input)

  if (shouldReadInput(input, fileExtension, preprocessor)) {
    return new Promise((resolve, _r) => {
      fs.readFile(input, 'utf8', (_e, stylesText) => {
        // We assume there's no error reading the file because we did a stat on it above.
        resolve(stylesText)
      })
    })
  }

  return Promise.resolve(null)
}

let shouldReadInput = (input, fileExtension, preprocessor) => {
  if (input) {
    if (fileExtension === '.css') {
      return true
    }

    if (preprocessor === 'sass' && (fileExtension === '.scss' || fileExtension === '.sass')) {
      return true
    }
  }

  return false
}
