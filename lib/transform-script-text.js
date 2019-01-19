let babel = require('@babel/core')
let transform = require('./transform-ast')
let deepClone = obj => JSON.parse(JSON.stringify(obj))
let parser = require('node-html-parser')

let getElementClasses = (ast, className) => ast.program.body.filter(
  bodyObject => bodyObject.type === 'ClassDeclaration' && bodyObject.id.name == className
)

let getConnectedCallbacks = (ast, className) => (
  getElementClasses(ast, className)[0].body.body.filter(
    bodyObject => bodyObject.type === 'ClassMethod' && bodyObject.key.name === 'connectedCallback'
  )
)

let mutateES5ConnectedCallback = (ast, className, innerHTML) => {
  let document = parser.parse(`<html>${innerHTML}</html>`)
  let connectedCallback = getConnectedCallbacks(ast, className)[0]

  if (document.querySelector('slot')) {
    require('./set-inner-html-ast').withSlot(innerHTML).reverse().forEach(bodyObject => {
      connectedCallback.body.body.unshift(bodyObject)
    })
  } else {
    connectedCallback.body.body.unshift(require('./set-inner-html-ast').withoutSlot(innerHTML))
  }
}

let mutateES6ConnectedCallback = (ast, className, innerHTML, stylesText) => {
  let document = parser.parse(`<html>${innerHTML}</html>`)
  let connectedCallback = getConnectedCallbacks(ast, className)[0]

  require('./set-inner-html-ast').viaShadow(innerHTML, stylesText).reverse().forEach(bodyObject => {
    connectedCallback.body.body.unshift(bodyObject)
  })
}

let addShadowDomAliases = (ast, className) => {
  let body = getElementClasses(ast, className)[0].body.body

  require('./shadow-root-aliases-ast').forEach(bodyObject => body.push(bodyObject))
}

module.exports = (scriptText, tagName, className, outputFolder, innerHTML, stylesText) => {
  let ast

  if (scriptText) {
    ast = babel.parseSync(scriptText)
  } else {
    // TODO predicate this on whether there's a matching class with className.
    ast = require('./class-extends-html-element-ast')(className)
  }

  if (ast && ast.program && ast.program.body) {
    if (innerHTML) {
      let classes = getElementClasses(ast, className)

      // TODO handle classes that are in EEFEs or whatnot. Dive to them.
      if (classes.length > 1) {
        console.error(`No fair. I can\'t handle more than one class named ${className}.`)
        process.exit(1)
      } else if (classes.length === 0) {
        // console.error(`I didn't find any classes named ${className}`)
        // TODO handle when there are no classes found that match the className.
      }

      let elementClass = classes[0]

      if (!elementClass.superClass) {
        elementClass.superClass = {
          "type": "Identifier",
          "name": "HTMLElement",
        }
      }

      let connectedCallbacks = getConnectedCallbacks(ast, className)
      let connectedCallback = connectedCallbacks[0]

      if (connectedCallbacks.length > 1) {
        console.error(`Duh, I don\'t know what to do with more than one connectedCallback for your ${className} custom element class.`)
        process.exit(1)
      }

      if (connectedCallbacks.length === 0) {
        elementClass.body.body.push(require('./connected-callback-ast')())
      }

      let es5Ast = deepClone(ast)
      mutateES5ConnectedCallback(es5Ast, className, innerHTML)
      transform.es5(es5Ast, tagName, className, outputFolder)

      let es6Ast = deepClone(ast)
      addShadowDomAliases(es6Ast, className)
      mutateES6ConnectedCallback(es6Ast, className, innerHTML, stylesText)
      transform.es6(es6Ast, tagName, className, outputFolder)
    } else {
      transform.es5(ast, tagName, className, outputFolder)
      transform.es6(ast, tagName, className, outputFolder)
    }
  }
}
