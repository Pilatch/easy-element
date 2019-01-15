module.exports = (parameters = {
  innerHTML: null,
  scriptText: null,
  stylesText: null,
  className: null,
  tagName: null,
  outputFolder: null,
}) => {
  let {innerHTML, scriptText, stylesText, className, tagName, outputFolder} = parameters

  if (stylesText) {
    require('./write-css')(stylesText, outputFolder, tagName)
  }

  if (scriptText) {
    require('./transform-script-text')(scriptText, tagName, className, outputFolder, innerHTML)
  }
}
