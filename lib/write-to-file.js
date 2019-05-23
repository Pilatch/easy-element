let babel = require('@babel/core')
let fs = require('fs')

let minifyJs = (code, minify) => {
  if (minify) {
    let minified = require('terser').minify(code)

    if (minified.error) {
      require('./fail')(`Error minifying JS: ${minified.error}`)
    }

    return minified.code
  }

  return code
}

let mkdir = outputFolder => {
  require('mkdirp')(outputFolder, error => {
    if (error) {
      require('./fail')(`Could not create output folder ${outputFolder}`)
    }
  })
}

let transformAndWrite = (fileExtension, babelTransformOptions = {}) => (ast, tagName, outputFolder, minify) => {
  let transformResult

  try {
    transformResult = babel.transformFromAstSync(ast, null, babelTransformOptions)
  } catch (error) {
    require('./fail')(`Error transforming to ${fileExtension}.js: ${error}`)
  }

  let code = minifyJs(transformResult.code, minify)

  if (transformResult.code) {
    mkdir(outputFolder)
    let fileName = `${outputFolder}/${tagName}.${fileExtension}.js`

    fs.writeFile(fileName, code, error => {
      if (error) {
        require('./fail')(`Error writing to file ${fileName}, ${error}`)
      }
    })
  }
}

module.exports = {
  makeOutputFolder: mkdir,
  es5: transformAndWrite('es5', {configFile: `${__dirname}/../.babelrc`}),
  es6: transformAndWrite('class'),
}
