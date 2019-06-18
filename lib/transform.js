module.exports = (parameters = {
  innerHTML: null,
  scriptText: null,
  parsedStyles: null,
  className: null,
  tagName: null,
  minify: false,
}) => {
  let {innerHTML, scriptText, parsedStyles, className, tagName, minify} = parameters

  if (scriptText && scriptText.trim()) {
    if (!scriptText.includes('class')) {
      require('./fail')(`The <script> for ${tagName} must include a class named "${className}", or just delete the <script> for no functionality.`)
    }

    return require('./transform-script-text')(scriptText, tagName, className, innerHTML, parsedStyles, minify)
  }

  return require('./transform-script-text')(null, tagName, className, innerHTML, parsedStyles, minify)
}
