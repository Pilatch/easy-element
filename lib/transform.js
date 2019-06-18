module.exports = (parameters = {
  innerHTML: null,
  scriptText: null,
  parsedStyles: null,
  className: null,
  tagName: null,
  minify: false,
}) => {
  let {innerHTML, scriptText, parsedStyles, className, tagName, minify} = parameters
  let trimmedToNullScriptText = scriptText && scriptText.trim()
    ? scriptText
    : null

  return require('./transform-script-text')(trimmedToNullScriptText, tagName, className, innerHTML, parsedStyles, minify)
}
