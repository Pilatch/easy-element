let fs = require('fs')

module.exports = function(styleRulesText, outputFolder, tagName) {
  fs.writeFileSync(`${outputFolder}/${tagName}.css`, styleRulesText.trim() + '\n')
}
