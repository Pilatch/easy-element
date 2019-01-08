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

    require('./write-css')(stylesText, outputFolder, tagName)

    if (scriptText) {
      let ast = babel.parseSync(scriptText)
      let classes = ast.program.body.filter(
        bodyObject => bodyObject.type === 'ClassDeclaration' && bodyObject.id.name == className
      )

      // TODO handle when there are no classes found that match the className.

      if (classes.length > 1) {
        console.error(`No fair. I can\'t handle more than one class for your ${tagName} custom element.`)
        process.exit(1)
      }

      let connectedCallbacks = classes[0].body.body.filter(
        bodyObject => bodyObject.type === 'ClassMethod' && bodyObject.key.name === 'connectedCallback'
      )

      if (connectedCallbacks.length > 1) {
        console.error(`Duh, I don\'t know what to do with more than one connectedCallback for your ${className} custom element class.`)
        process.exit(1)
      }

      connectedCallbacks[0].body.body.unshift(require('./set-inner-html-ast')(innerHTML))

      require('./transform-ast')(ast, tagName, outputFolder)

      // TODO handle there being no connectedCallback, but a template

      // TODO if there is no superclass, make it HTMLElement (probably without the start and end tho)
      // superClass:
      //  Node {
      //    type: 'Identifier',
      //    start: 25,
      //    end: 36,
      //    loc: [SourceLocation],
      //    name: 'HTMLElement' },
    }
  } else {
    console.error(`Could not parse input file at ${input}`)
    process.exit(1)
  }
}
