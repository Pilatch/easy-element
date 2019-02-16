let babel = require('@babel/core')
let fs = require('fs')

module.exports = (input, outputFolder, preprocessor) => {
  let elementHtml = fs.readFileSync(input)

  if (!elementHtml) {
    console.error('Could not read the input file.')
    process.exit(1)
  }

  let htmlParseResult = require('./parse-html')(elementHtml)

  if (htmlParseResult) {
    let {stylesText, scriptText, innerHTML} = htmlParseResult
    let {tagName, className} = require('./names')(input, '.html')

    require('./css-input')(stylesText, null, preprocessor)
      .then(resolvedStylesText => {
        require('./transform')({
          innerHTML: innerHTML,
          scriptText: scriptText,
          stylesText: resolvedStylesText,
          className: className,
          tagName: tagName,
          outputFolder: outputFolder,
        })
      })
  } else {
    console.error(`Could not parse input file at ${input}`)
    process.exit(1)
  }
}
