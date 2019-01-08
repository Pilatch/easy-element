let babel = require('@babel/core')

module.exports = (scriptText, tagName, className, outputFolder, innerHTML) => {
  let ast = babel.parseSync(scriptText)

  if (innerHTML) {
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
  }

  require('./transform-ast')(ast, tagName, outputFolder)
}
