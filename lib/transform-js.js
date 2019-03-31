let fail = require('./fail')

module.exports = (input, outputFolder) => {
  let {tagName, className} = require('./names')(input, '.js')
  let scriptText = require('fs').readFileSync(input, 'utf8')

  if (!scriptText) {
    fail(`Could not read script from file ${input}`)
  }

  if (!scriptText.trim()) {
    fail(`File ${input} is blank! Just delete it for no functionality.`)
  }

  if (!scriptText.includes('class')) {
    fail(`The JavaScript file ${input} must include a class named "${className}", or just delete it for no functionality.`)
  }

  return Promise.resolve(
    require('./transform-script-text')(scriptText, tagName, className, null, null)
  )
}
