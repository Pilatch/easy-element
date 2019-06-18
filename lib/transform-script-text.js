let babel = require('@babel/core')
let deepClone = obj => JSON.parse(JSON.stringify(obj))
let parser = require('node-html-parser')
let defineCustomElement = require('./custom-elements-define-ast')
let fail = require('./fail')
let astQuery = new (require('astq'))()

astQuery.adapter('mozast')

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

let getElementClasses = (ast, className) =>
  astQuery.query(ast, `// ClassDeclaration [ /Identifier [ @name == '${className}' ] ]`)

let getElementClassParent = (ast, className) =>
  astQuery.query(ast, `// * [ /ClassDeclaration [ /Identifier [ @name == '${className}' ] ] ] `)

let getConnectedCallbacks = (ast, className) =>
  getElementClasses(ast, className)[0].body.body.filter(
    bodyObject => bodyObject.type === 'ClassMethod' && bodyObject.key.name === 'connectedCallback'
  )

let getConstructors = (elementClass) =>
  elementClass.body.body.filter(
    bodyObject => bodyObject.type === 'ClassMethod' && bodyObject.key.name === 'constructor'
  )

let minifyCss = (styles, minify) => {
  if (minify) {
    let CleanCSS = require('clean-css')

    try {
      return new CleanCSS({}).minify(styles).styles
    } catch (error) {
      require('./fail')(`Error minifying CSS: ${error}`)
    }
  }

  return styles
}

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

let mutateConstructor = (ast, className) => {
  let elementClass = getElementClasses(ast, className)[0]

  if (elementClass) {
    let cons = getConstructors(elementClass)

    if (cons.length === 1) {
      let superCall = require('./super-call')

      if (!superCall.isSuperCall(cons[0].body.body[0])) {
        // Makes sure the first line is a call to super()
        cons[0].body.body.unshift(superCall.ast)
      }
    } else if (cons.length > 1) {
      fail(`Class ${className} has multiple constructors.`)
    }
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

let addShadowDomAliases = (ast, className) => {
  let body = getElementClasses(ast, className)[0].body.body

  require('./shadow-root-aliases-ast').forEach(bodyObject => body.push(bodyObject))
}

let transformSelectors = mapperName => (tagName, parsedStyles) => {
  if (parsedStyles) {
    let {stringify, stylesObject} = parsedStyles
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

module.exports = (scriptText, tagName, className, innerHTML, parsedStyles, minify) => {
  let ast, es5Ast, es6Ast, classes

  if (scriptText) {
    try {
      ast = babel.parseSync(scriptText)
    } catch(parseError) {
      fail([
        `Error parsing script for ${tagName}`,
        parseError.message,
      ])
    }
    mutateConstructor(ast, className)
  } else {
    ast = require('./class-extends-html-element-ast')(className)
    classes = [ast.program.body[0]]
  }

  if (ast && ast.program && ast.program.body) {
    if (!classes) {
      classes = getElementClasses(ast, className)
    }

    if (classes.length > 1) {
      fail(`No fair. I can't handle more than one class named ${className}.`)
    }

    if (classes.length === 0) {
      fail([
        `I didn't find a class named "${className}" in your JavaScript.`,
        `Either delete your JavaScript to build an element with no behavior, or define a class named "${className}" for custom behavior.`,
      ])
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
    getElementClassParent(es5Ast, className)[0].body.push(defineCustomElement.es5(className, tagName))

    es6Ast = deepClone(ast)
    getElementClassParent(es6Ast, className)[0].body.push(defineCustomElement.es6(className, tagName))

    if (innerHTML) {
      mutateES5Class(es5Ast, tagName, className, innerHTML)
    }
    if (parsedStyles) {
      es5Ast.program.body.push(appendStyleAst(minifyCss(elementNameStyles(tagName, parsedStyles), minify)))
    }

    addShadowDomAliases(es6Ast, className) // One would think these aren't necessary without innerHTML, but for no-surprises principle, put 'em on there.
    mutateES6ConnectedCallback(es6Ast, className, innerHTML, minifyCss(shadowDomStyles(tagName, parsedStyles), minify))

    return {
      es5Ast: es5Ast,
      es6Ast: es6Ast,
      tagName: tagName,
    }
  }

  return null
}
