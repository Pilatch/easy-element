let fs = require('fs')
let path = require('path')

module.exports = (input, outputFolder) => {
  fs.createReadStream(input).pipe(fs.createWriteStream(`${outputFolder}/${path.basename(input)}`))
}
