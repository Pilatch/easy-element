let babel = require('@babel/core')
let parser = require('node-html-parser')

let getConnectedCallbacks = classAst => classAst.body.body.filter(
  bodyObject => bodyObject.type === 'ClassMethod' && bodyObject.key.name === 'connectedCallback'
)

module.exports = (scriptText, tagName, className, outputFolder, innerHTML) => {
  let ast = babel.parseSync(scriptText)

  if (innerHTML) {
    let classes = ast.program.body.filter(
      bodyObject => bodyObject.type === 'ClassDeclaration' && bodyObject.id.name == className
    )

    // TODO if there is no superclass, make it HTMLElement
    // superClass:
    //  Node {
    //    type: 'Identifier',
    //    name: 'HTMLElement' },

    // TODO handle when there are no classes found that match the className.

    if (classes.length > 1) {
      console.error(`No fair. I can\'t handle more than one class for your ${tagName} custom element.`)
      process.exit(1)
    }

    let connectedCallbacks = getConnectedCallbacks(classes[0])

    if (connectedCallbacks.length === 0) {
      classes[0].body.body.push(require('./connected-callback-ast')())
      connectedCallbacks = getConnectedCallbacks(classes[0])
    } else if (connectedCallbacks.length > 1) {
      console.error(`Duh, I don\'t know what to do with more than one connectedCallback for your ${className} custom element class.`)
      process.exit(1)
    }

    // TODO abstract this if/else away to set-inner-html-ast
    let document = parser.parse(`<html>${innerHTML}</html>`)

    if (document.querySelector('slot')) {
      require('./set-inner-html-ast').withSlot(innerHTML).reverse().forEach(bodyObject => {
        connectedCallbacks[0].body.body.unshift(bodyObject)
      })
    } else {
      connectedCallbacks[0].body.body.unshift(require('./set-inner-html-ast').withoutSlot(innerHTML))
    }

    // TODO add the eventlistener automatically if it's not there already
  }

  require('./transform-ast')(ast, tagName, outputFolder)
}
