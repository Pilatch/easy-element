let fs = require('fs')
let fail = require('./fail')

module.exports = (input, outputFolder, preprocessor) => {
  let elementHtml = fs.readFileSync(input)

  if (!elementHtml) {
    fail('Could not read the input file.')
  }

  let htmlParseResult = require('./parse-html')(elementHtml)

  if (htmlParseResult) {
    let {stylesText, scriptText, innerHTML} = htmlParseResult
    let {tagName, className} = require('./names')(input, '.html')

    if (preprocessor && htmlParseResult.preprocessor && (preprocessor !== htmlParseResult.preprocessor)) {
      fail(`The preprocessor option "${preprocessor}" was given, but the <style> has a preprocessor attribute of "${htmlParseResult.preprocessor}".\nRemove one or the other.`)
    }
    // The command-line flag takes precedent,
    // but respect the style tag's preprocessor attribute otherwise.
    preprocessor = preprocessor || htmlParseResult.preprocessor

    require('./css-input')(stylesText, input, preprocessor)
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
    fail(`Could not parse input file at ${input}`)
  }
}
