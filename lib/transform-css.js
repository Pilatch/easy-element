let fs = require('fs')

module.exports = (input, outputFolder, preprocessor) => {
  let {tagName, className} = require('./names')(input, '.css')
  let cssStats

  try {
    cssStats = fs.statSync(input)
  } catch (_) {
    console.error(`Could not read styles from file "${input}".`)
    process.exit(1)
  }

  require('./css-input')(null, cssStats, input, preprocessor)
    .then(resolvedStylesText => {
      require('./transform')({
        innerHTML: null,
        scriptText: null,
        stylesText: resolvedStylesText,
        className: className,
        tagName: tagName,
        outputFolder: outputFolder,
      })
    })
}
