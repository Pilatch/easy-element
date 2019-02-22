let babel = require('@babel/core')
let fs = require('fs')

let mkdir = outputFolder => {
  require('mkdirp')(outputFolder, error => {
    if (error) {
      require('./fail')(`Could not create output folder ${outputFolder}`)
    }
  })
}

let transformAndWriteES5 = (ast, tagName, className, outputFolder, stylesText) => {
  let es5Result = babel.transformFromAstSync(ast, null, {configFile: `${__dirname}/../.babelrc`})

  if (es5Result.code) {
    mkdir(outputFolder)
    fs.writeFileSync(`${outputFolder}/${tagName}.es5.js`, es5Result.code)
  }
}

let transformAndWriteES6 = (ast, tagName, className, outputFolder, stylesText) => {
  let classResult = babel.transformFromAstSync(ast)

  if (classResult.code) {
    mkdir(outputFolder)
    fs.writeFileSync(`${outputFolder}/${tagName}.class.js`, classResult.code)
  }
}

module.exports = {
  makeOutputFolder: mkdir,
  es5: transformAndWriteES5,
  es6: transformAndWriteES6,
}
