let parse = require('@babel/core').parse
let defineLine = (className, tagName, superClass) => {
  let extendsElement = superClassElementName(superClass)

  if (extendsElement) {
    return `customElements.define('${tagName}', ${className}, {extends: '${extendsElement}'})`
  }

  return `customElements.define('${tagName}', ${className})`
}
let superClassElementName = superClass => {
  let result = /HTML(\w+?)Element/.exec(superClass)

  if (result) {
    return result[1].toLowerCase()
  }

  return null
}
let es6 = (className, tagName, superClass) => (
  parse(defineLine(className, tagName, superClass))
)
let es5 = (className, tagName, superClass) => (
  parse(`
    window.addEventListener('WebComponentsReady', () => {
      ${defineLine(className, tagName, superClass)}
    })
  `)
)

module.exports = {
  es6: es6,
  es5: es5,
}
