let fs = require('fs')

module.exports = (input, outputFolder) => {
  let {tagName, className} = require('./names')(input, '.css')
  let stylesText = fs.readFileSync(input, 'utf8')

  if (!stylesText) {
    console.error(`Could not read styles from file ${input}.`)
    process.exit(1)
  }

  require('./transform')({
    innerHTML: null,
    scriptText: null,
    stylesText: stylesText,
    className: className,
    tagName: tagName,
    outputFolder: outputFolder,
  })
}
