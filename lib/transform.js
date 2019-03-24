module.exports = (parameters = {
  innerHTML: null,
  scriptText: null,
  stylesText: null,
  className: null,
  tagName: null,
}) => {
  let {innerHTML, scriptText, stylesText, className, tagName} = parameters

  if (scriptText && scriptText.trim()) {
    if (!scriptText.includes('class')) {
      require('./fail')(`The <script> for ${tagName} must include a top-level class named "${className}", or just delete the <script> for no functionality.`)
    }

    return require('./transform-script-text')(scriptText, tagName, className, innerHTML, stylesText)
  }

  return require('./transform-script-text')(null, tagName, className, innerHTML, stylesText)
}
