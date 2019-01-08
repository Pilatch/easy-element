let fs = require('fs')

module.exports = (input, outputFolder) => {
  let {tagName, className} = require('./names')(input, '.js')
  let scriptText = fs.readFileSync(input)

  if (!scriptText) {
    console.error(`Could not read script from file ${input}`)
    process.exit(1)
  }

  require('./transform-script-text')(scriptText, tagName, className, outputFolder)
}


