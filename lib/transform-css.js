let fs = require('fs')

module.exports = (options, fileExtension = '.css') => {
  let {tagName, className} = require('./names')(options.input, fileExtension)

  try {
    fs.statSync(options.input)
  } catch (_) {
    require('./fail')(`Could not read styles from file "${options.input}".`)
  }

  return require('./parse-css')(null, tagName, options)
    .then(parsedStyles => require('./transform')({
      innerHTML: null,
      scriptText: null,
      parsedStyles: parsedStyles,
      className: className,
      tagName: tagName,
      minify: options.minify,
    }))
    .catch(error => require('./fail')(error))
}
