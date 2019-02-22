module.exports = (parameters = {
  innerHTML: null,
  scriptText: null,
  stylesText: null,
  className: null,
  tagName: null,
  outputFolder: null,
}) => {
  let {innerHTML, scriptText, stylesText, className, tagName, outputFolder} = parameters

  if (scriptText && scriptText.trim()) {
    if (!scriptText.includes('class')) {
      require('./fail')(`The <script> for ${tagName} must include a top-level class named "${className}", or just delete the <script> for no functionality.`)
    }

    require('./transform-script-text')(scriptText, tagName, className, outputFolder, innerHTML, stylesText)
  } else {
    require('./transform-script-text')(null, tagName, className, outputFolder, innerHTML, stylesText)
  }
}
