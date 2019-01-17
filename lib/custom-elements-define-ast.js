let es6 = (className, tagName) => (
  require('@babel/core').parse(
    `customElements.define('${tagName}', ${className})`
  )
)

let es5 = (className, tagName) => (
  require('@babel/core').parse(`
    window.addEventListener('WebComponentsReady', () => {
      customElements.define('${tagName}', ${className})
    })
  `)
)

module.exports = {
  es6: es6,
  es5: es5,
}
