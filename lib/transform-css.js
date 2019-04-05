let fs = require('fs')

module.exports = (options, fileExtension = '.css') => {
  let {tagName, className} = require('./names')(options.input, fileExtension)

  try {
    fs.statSync(options.input)
  } catch (_) {
    require('./fail')(`Could not read styles from file "${options.input}".`)
  }

  return require('./css-input')(null, options)
    .then(resolvedStylesText => require('./transform')({
      innerHTML: null,
      scriptText: null,
      stylesText: resolvedStylesText,
      className: className,
      tagName: tagName,
      minify: options.minify,
    }))
}
