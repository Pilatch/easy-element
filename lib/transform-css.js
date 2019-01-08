let babel = require('@babel/core')
let fs = require('fs')
let path = require('path')

let jsTemplate = (tagName, className) => `
  class ${className} extends HTMLElement {}
  window.addEventListener('WebComponentsReady', function () {
    customElements.define('${tagName}', ${className})
  })
`

module.exports = (input, outputFolder) => {
  let {tagName, className} = require('./names')(input, '.css')
  let ast = babel.parseSync(
    jsTemplate(tagName, className)
  )

  require('./transform-ast')(ast, tagName, outputFolder)
  fs.createReadStream(input).pipe(fs.createWriteStream(`${outputFolder}/${path.basename(input)}`))
  // fs.copyFileSync(input, `${outputFolder}/${input}`)
}
