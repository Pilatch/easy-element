let fs = require('fs')

module.exports = function(stylesText, outputFolder, tagName) {
  if (stylesText) {
    fs.writeFileSync(`${outputFolder}/${tagName}.css`, stylesText.trim() + '\n')
  }
}
