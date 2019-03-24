let fs = require('fs')

module.exports = (input, outputFolder, preprocessor, fileExtension = '.css') => {
  let {tagName, className} = require('./names')(input, fileExtension)

  try {
    fs.statSync(input)
  } catch (_) {
    require('./fail')(`Could not read styles from file "${input}".`)
  }

  return require('./css-input')(null, input, preprocessor)
    .then(resolvedStylesText => require('./transform')({
      innerHTML: null,
      scriptText: null,
      stylesText: resolvedStylesText,
      className: className,
      tagName: tagName,
    }))
}
