let fs = require('fs')

module.exports = (input, outputFolder) => {
  let {tagName, className} = require('./names')(input, '.js')
  let scriptText = fs.readFileSync(input, 'utf8')

  if (!scriptText) {
    console.error(`Could not read script from file ${input}`)
    process.exit(1)
  }

  if (!scriptText.trim()) {
    console.error(`File ${input} is blank! Just delete it for no functionality.`)
    process.exit(1)
  }

  if (!scriptText.includes('class')) {
    console.error(`The JavaScript file ${input} must include a class named "${className}", or just delete it for no functionality.`)
    process.exit(1)
  }

  require('./transform-script-text')(scriptText, tagName, className, outputFolder)
}


