let babel = require('@babel/core')
let fs = require('fs')

module.exports = (ast, tagName, outputFolder) => {
  let classResult = babel.transformFromAstSync(ast)

  if (classResult.code) {
    fs.writeFileSync(`${outputFolder}/${tagName}.class.js`, classResult.code)
  }

  let es5Result = babel.transformFromAstSync(ast, null, {configFile: `../.babelrc`})

  if (es5Result.code) {
    fs.writeFileSync(`${outputFolder}/${tagName}.es5.js`, es5Result.code)
  }
}
