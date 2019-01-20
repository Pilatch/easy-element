let babel = require('@babel/core')
let fs = require('fs')

let mkdir = outputFolder => {
  require('mkdirp')(outputFolder, error => {
    if (error) {
      console.error(`Could not create output folder ${outputFolder}`)
      process.exit(1)
    }
  })
}

let transformES5 = (ast, tagName, className, outputFolder) => {
  let es5Result = babel.transformFromAstSync(ast, null, {configFile: `${__dirname}/../.babelrc`})

  if (es5Result.code) {
    mkdir(outputFolder)
    fs.writeFileSync(`${outputFolder}/${tagName}.es5.js`, es5Result.code)
  }
}

let transformES6 = (ast, tagName, className, outputFolder) => {
  let classResult = babel.transformFromAstSync(ast)

  if (classResult.code) {
    mkdir(outputFolder)
    fs.writeFileSync(`${outputFolder}/${tagName}.class.js`, classResult.code)
  }
}

module.exports = {
  es5: transformES5,
  es6: transformES6,
}
