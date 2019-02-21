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

  if (shouldReadInput(input, preprocessor)) {
    return new Promise(resolve => {
      fs.readFile(input, 'utf8', (_e, resolvedStylesText) => {
        // We assume there's no error reading the file because we did a stat on it above.
        resolve(resolvedStylesText)
      })
    })
  }

  return Promise.resolve(null)
}

let shouldReadInput = (input, preprocessor) => {
  if (input) {
    let fileExtension = require('path').extname(input)

    if (fileExtension === '.css') {
      return true
    }

    if (preprocessor === 'sass' && (fileExtension === '.scss' || fileExtension === '.sass')) {
      return true
    }
  }

  return false
}
