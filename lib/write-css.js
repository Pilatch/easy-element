let fs = require('fs')

module.exports = function(stylesText, outputFolder, tagName) {
  if (stylesText) {
    require('mkdirp')(outputFolder, error => {
      if (error) {
        require('./fail')(`Could not create output folder ${outputFolder}`)
      }

      fs.writeFileSync(`${outputFolder}/${tagName}.css`, stylesText.trim() + '\n')
    })
  }
}
