let fs = require('fs')

// Returns a Promise.
// Make sure to stat cssInput before running this.
module.exports = (stylesText, cssInput, preprocessor) => {
  return resolveStylesText(stylesText, cssInput)
    .then(resolvedStylesText => {
      if (preprocessor) {
        return require('./preprocess-css')(preprocessor, resolvedStylesText, cssInput)
      }

      return resolvedStylesText
    })
}

// Returns a promise regardless of whether stylesText exist.
let resolveStylesText = (stylesText, cssInput) => {
  if (stylesText) {
    return Promise.resolve(stylesText)
  }

  if (cssInput) {
    return new Promise((resolve, _r) => {
      fs.readFile(cssInput, 'utf8', (_e, stylesText) => {
        // We assume there's no error reading the file because we did a stat on it above.
        resolve(stylesText)
      })
    })
  }

  return Promise.resolve(null)
}
