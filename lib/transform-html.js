let babel = require('@babel/core')
let fs = require('fs')

module.exports = (input, outputFolder) => {
  let elementHtml = fs.readFileSync(input)

  if (!elementHtml) {
    console.error('Could not read the input file.')
    process.exit(1)
  }

  let htmlParseResult = require('./parse-html')(elementHtml)

  if (htmlParseResult) {
    let {isHTML, stylesText, scriptText, innerHTML} = htmlParseResult
    let {tagName, className} = require('./names')(input, '.html')

    if (stylesText) {
      require('./write-css')(stylesText, outputFolder, tagName)
    }

    if (scriptText) {
      require('./transform-script-text')(scriptText, tagName, className, outputFolder, innerHTML)
    }
  } else {
    console.error(`Could not parse input file at ${input}`)
    process.exit(1)
  }
}
