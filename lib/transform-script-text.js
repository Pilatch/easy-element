let babel = require('@babel/core')
let deepClone = obj => JSON.parse(JSON.stringify(obj))
let parser = require('node-html-parser')
let defineCustomElement = require('./custom-elements-define-ast')
let fail = require('./fail')

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
  bodyObject => bodyObject.type === 'ClassDeclaration' && bodyObject.id.name === className
)

let getConnectedCallbacks = (ast, className) => (
  getElementClasses(ast, className)[0].body.body.filter(
    bodyObject => bodyObject.type === 'ClassMethod' && bodyObject.key.name === 'connectedCallback'
  )
)

let validateSlots = (tagName, slots) => {
  if (slots.length > 1) {
    let names = {}

    slots.forEach(slot => {
      let slotName = slot.attributes.name

      if (!slotName) {
        fail(`The ${tagName} template has multiple slots, so each must have a "name" attribute.`)
      }

      if (names[slotName]) {
        fail(`The ${tagName} template has multiple slots named "${slotName}". Each should be unique.`)
      }

      names[slotName] = true
    })
  }
}

let mutateES5Class = (ast, tagName, className, innerHTML) => {
  let document = parser.parse(`<html>${innerHTML}</html>`)
  let slots = document.querySelectorAll('slot')
  let connectedCallback = getConnectedCallbacks(ast, className)[0]

  validateSlots(tagName, slots)

  if (slots.length === 0) {
    connectedCallback.body.body.unshift(require('./set-inner-html-ast').withoutSlot(innerHTML))
  } else if (slots.length === 1) {
    require('./set-inner-html-ast').withOneSlot(innerHTML).reverse().forEach(bodyObject => {
      connectedCallback.body.body.unshift(bodyObject)
    })
  } else {
    let elementClass = getElementClasses(ast, className)[0]

    require('./multi-slot-es5-helper-class-methods').forEach(method => elementClass.body.body.push(method))
    require('./set-inner-html-ast').withMultipleSlots(innerHTML).reverse().forEach(bodyObject => {
      connectedCallback.body.body.unshift(bodyObject)
    })
  }
}

let mutateES6ConnectedCallback = (ast, className, innerHTML, stylesText) => {
  let connectedCallback = getConnectedCallbacks(ast, className)[0]

  require('./set-inner-html-ast').viaShadow(innerHTML, stylesText).reverse().forEach(bodyObject => {
    connectedCallback.body.body.unshift(bodyObject)
  })
}

let parseStyles = stylesText => {
  try {
    let css = require('css')

    return {
      stringify: css.stringify,
      stylesObject: css.parse(stylesText),
    }
  } catch (error) {
    let errorLines = error.source.split('\n')
    let chalk = require('chalk')

    fail([
      `Error parsing CSS at line ${error.line}, column ${error.column}: ${error.reason}.\n`,
      chalk.white(errorLines[error.line - 4] || ''),
      chalk.white(errorLines[error.line - 3] || ''),
      chalk.white(errorLines[error.line - 2] || ''),
      chalk.red(errorLines[error.line - 1]), // the offending line,
      chalk.white(errorLines[error.line] || ''),
      chalk.white(errorLines[error.line + 1] || ''),
      chalk.white(errorLines[error.line + 2] || ''),
      '\n',
    ])
  }
}

let addShadowDomAliases = (ast, className) => {
  let body = getElementClasses(ast, className)[0].body.body

  require('./shadow-root-aliases-ast').forEach(bodyObject => body.push(bodyObject))
}

let transformSelectors = mapperName => (tagName, stylesText) => {
  if (stylesText) {
    let {stringify, stylesObject} = parseStyles(stylesText)
    let selectorMapper = require('./transform-css-selector')[mapperName](tagName)

    stylesObject.stylesheet.rules.forEach(rule => {
      if (rule.selectors) {
        try {
          rule.selectors = rule.selectors.map(selectorMapper)
        } catch (selectorsException) {
          fail(`${selectorsException.message}\nError in CSS selector:\n\n${rule.selectors}\n`)
        }
      }
    })

    return stringify(stylesObject)
  }

  return null
}

let elementNameStyles = transformSelectors('fromHost')
let shadowDomStyles = transformSelectors('toHost')

module.exports = (scriptText, tagName, className, innerHTML, stylesText) => {
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
      fail(`No fair. I can't handle more than one class named ${className}.`)
    }

    if (classes.length === 0) {
      fail(`I didn't find any classes named ${className}`)
    }

    let elementClass = classes[0]

    if (!elementClass.superClass) {
      elementClass.superClass = {
        'type': 'Identifier',
        'name': 'HTMLElement',
      }
    }

    let connectedCallbacks = getConnectedCallbacks(ast, className)

    if (connectedCallbacks.length > 1) {
      fail(`I don't know what to do with more than one connectedCallback for your ${className} custom element class.`)
    }

    if (connectedCallbacks.length === 0) {
      elementClass.body.body.push(require('./connected-callback-ast')())
    }

    es5Ast = deepClone(ast)
    es6Ast = deepClone(ast)

    if (innerHTML) {
      mutateES5Class(es5Ast, tagName, className, innerHTML)
    }
    if (stylesText) {
      es5Ast.program.body.push(appendStyleAst(elementNameStyles(tagName, stylesText)))
    }

    addShadowDomAliases(es6Ast, className) // One would think these aren't necessary without innerHTML, but for no-surprises principle, put 'em on there.
    mutateES6ConnectedCallback(es6Ast, className, innerHTML, shadowDomStyles(tagName, stylesText))

    es5Ast.program.body.push(defineCustomElement.es5(className, tagName))
    es6Ast.program.body.push(defineCustomElement.es6(className, tagName))

    return {
      es5Ast: es5Ast,
      es6Ast: es6Ast,
      tagName: tagName,
    }
  }

  return null
}
