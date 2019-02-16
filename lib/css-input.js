let fs = require('fs')
// Returns a Promise.
module.exports = (stylesText, cssStats, cssInput, preprocessor) => {
  if (!stylesText && cssStats) {
    return getStyles(cssInput, preprocessor)
  }

  return Promise.resolve(stylesText)
}

let getStyles = (cssInput, preprocessor) => {
  if (preprocessor) {
    // Returns a Promise.
    return require('./preprocess-css')(preprocessor, fs.readFileSync(cssInput, 'utf8'))
  }

  return new Promise((resolve, _r) => {
    fs.readFile(cssInput, 'utf8', (_e, stylesText) => {
      // We assume there's no error reading the file because we did a stat on it above.
      resolve(stylesText)
    })
  })
}
