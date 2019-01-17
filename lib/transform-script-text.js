let babel = require('@babel/core')
let parser = require('node-html-parser')

let getConnectedCallbacks = classAst => classAst.body.body.filter(
  bodyObject => bodyObject.type === 'ClassMethod' && bodyObject.key.name === 'connectedCallback'
)

module.exports = (scriptText, tagName, className, outputFolder, innerHTML) => {
  let ast

  if (scriptText) {
    ast = babel.parseSync(scriptText)
  } else {
    // TODO predicate this on whether there's a matching class with className.
    ast = require('./class-extends-html-element-ast')(className)
  }

  if (innerHTML && ast && ast.program && ast.program.body) {
    let classes = ast.program.body.filter(
      bodyObject => bodyObject.type === 'ClassDeclaration' && bodyObject.id.name == className
    )

    // TODO handle classes that are in EEFEs or whatnot. Dive to them.
    if (classes.length > 1) {
      console.error(`No fair. I can\'t handle more than one class named ${className}.`)
      process.exit(1)
    } else if (classes.length === 0) {
      // console.error(`I didn't find any classes named ${className}`)
      // TODO handle when there are no classes found that match the className.
    }

    if (!classes[0].superClass) {
      classes[0].superClass = {
        "type": "Identifier",
        "name": "HTMLElement",
      }
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
  }

  if (ast && ast.program && ast.program.body) {
    require('./transform-ast')(ast, tagName, className, outputFolder)
  }
}
