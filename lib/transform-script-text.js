let babel = require('@babel/core')
let deepClone = obj => JSON.parse(JSON.stringify(obj))
let parser = require('node-html-parser')
let writeToFile = require('./write-to-file')
let defineCustomElement = require('./custom-elements-define-ast')

let appendStyleAst = stylesText => (babel.parse(`
;(function () {
  var style = document.createElement('style')
  style.textContent = '${
    stylesText
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\n/g, '')
    }'
  document.head.appendChild(style)
})();
`).program)

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
  let connectedCallback = getConnectedCallbacks(ast, className)[0]

  require('./set-inner-html-ast').viaShadow(innerHTML, stylesText).reverse().forEach(bodyObject => {
    connectedCallback.body.body.unshift(bodyObject)
  })
}

let addShadowDomAliases = (ast, className) => {
  let body = getElementClasses(ast, className)[0].body.body

  require('./shadow-root-aliases-ast').forEach(bodyObject => body.push(bodyObject))
}

let elementNameStyles = (tagName, stylesText) => {
  if (stylesText) {
    let css = require('css')
    let stylesObject = css.parse(stylesText)

    stylesObject.stylesheet.rules.forEach(rule => {
      if (rule.selectors) {
        rule.selectors = rule.selectors.map(
          require('./transform-css-selector').fromHost(tagName)
        )
      }
    })

    return css.stringify(stylesObject)
  }

  return null
}
// TODO DRY up these guys
let shadowDomStyles = (tagName, stylesText) => {
  if (stylesText) {
    let css = require('css')
    let stylesObject = css.parse(stylesText)

    stylesObject.stylesheet.rules.forEach(rule => {
      if (rule.selectors) {
        rule.selectors = rule.selectors.map(
          require('./transform-css-selector').toHost(tagName)
        )
      }
    })

    return css.stringify(stylesObject)
  }

  return null
}

module.exports = (scriptText, tagName, className, outputFolder, innerHTML, stylesText) => {
  let ast, es5Ast, es6Ast

  if (scriptText) {
    ast = babel.parseSync(scriptText)
  } else {
    // TODO predicate this on whether there's a matching class with className.
    ast = require('./class-extends-html-element-ast')(className)
  }

  if (ast && ast.program && ast.program.body) {
    let classes = getElementClasses(ast, className)

    // TODO handle classes that are in EEFEs or whatnot. Dive to them.
    if (classes.length > 1) {
      console.error(`No fair. I can\'t handle more than one class named ${className}.`)
      process.exit(1)
    } else if (classes.length === 0) {
      console.error(`I didn't find any classes named ${className}`)
      process.exit(1)
    }

    let elementClass = classes[0]

    if (!elementClass.superClass) {
      elementClass.superClass = {
        "type": "Identifier",
        "name": "HTMLElement",
      }
    }

    let connectedCallbacks = getConnectedCallbacks(ast, className)

    if (connectedCallbacks.length > 1) {
      console.error(`Duh, I don\'t know what to do with more than one connectedCallback for your ${className} custom element class.`)
      process.exit(1)
    }

    if (connectedCallbacks.length === 0) {
      elementClass.body.body.push(require('./connected-callback-ast')())
    }

    es5Ast = deepClone(ast)
    es6Ast = deepClone(ast)

    if (innerHTML) {
      mutateES5ConnectedCallback(es5Ast, className, innerHTML)
      if (stylesText) {
        es5Ast.program.body.push(appendStyleAst(elementNameStyles(tagName, stylesText)))
      }

      addShadowDomAliases(es6Ast, className)
      mutateES6ConnectedCallback(es6Ast, className, innerHTML, shadowDomStyles(tagName, stylesText))
    } else {
      if (stylesText) {
        es5Ast.program.body.push(appendStyleAst(elementNameStyles(tagName, stylesText)))

        // If there's no innerHTML then we'll just use the es5-style of elementName styles being attached to document.head.
        es6Ast.program.body.push(appendStyleAst(elementNameStyles(tagName, stylesText)))
      }
    }

    es5Ast.program.body.push(defineCustomElement.es5(className, tagName))
    es6Ast.program.body.push(defineCustomElement.es6(className, tagName))

    write(es5Ast, es6Ast, tagName, className, outputFolder, stylesText)
  }
}

let write = (es5Ast, es6Ast, tagName, className, outputFolder, stylesText) => {
  writeToFile.es5(es5Ast, tagName, className, outputFolder, elementNameStyles(tagName, stylesText))
  writeToFile.es6(es6Ast, tagName, className, outputFolder, stylesText)
}
