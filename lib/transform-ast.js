let babel = require('@babel/core')
let fs = require('fs')
let defineCustomElement = require('./custom-elements-define-ast')

module.exports = (ast, tagName, className, outputFolder) => {
  require('mkdirp')(outputFolder, error => {
    if (error) {
      console.error(`Could not create output folder ${outputFolder}`)
      process.exit(1)
    }

    // Make the class version.
    ast.program.body.push(defineCustomElement.es6(className, tagName))
    let classResult = babel.transformFromAstSync(ast)

    if (classResult.code) {
      fs.writeFileSync(`${outputFolder}/${tagName}.class.js`, classResult.code)
    }

    // Remove the ES6 way of defining the element.
    ast.program.body.pop()

    // Slap on the polyfill way of doing it.
    ast.program.body.push(defineCustomElement.es5(className, tagName))
    let es5Result = babel.transformFromAstSync(ast, null, {configFile: `${__dirname}/../.babelrc`})

    if (es5Result.code) {
      fs.writeFileSync(`${outputFolder}/${tagName}.es5.js`, es5Result.code)
    }
  })
}
