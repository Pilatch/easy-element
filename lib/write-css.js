let fs = require('fs')

module.exports = function(stylesText, outputFolder, tagName) {
  if (stylesText) {
    require('mkdirp')(outputFolder, error => {
      if (error) {
        console.error(`Could not create output folder ${outputFolder}`)
        process.exit(1)
      }

      fs.writeFileSync(`${outputFolder}/${tagName}.css`, stylesText.trim() + '\n')
    })
  }
}
