let fs = require('fs')
let path = require('path')
let fail = require('./fail')
let findFileUpward = require('./find-file-upward')

// This resolves to a Promise with the CSS in its result...
// or blows up.
module.exports = (preprocessor, stylesText, input) => {
  if (preprocessor === 'postcss') {
    return preprocessPostcss(stylesText, input)
  }

  if (preprocessor === 'scss') {
    return preprocessSass(stylesText, input, false)
  }

  if (preprocessor === 'sass') {
    return preprocessSass(stylesText, input, true)
  }

  fail(`Unsupported CSS preprocessor, "${preprocessor}".`)
}

// Returns a Promise, as should all preprocess functions.
let preprocessPostcss = (stylesText, input) => {
  let postcssConfigFile = findFileUpward(process.cwd(), 'postcss.config.js')

  if (postcssConfigFile) {
    try {
      let config = require(postcssConfigFile)

      if (config && config.plugins) {
        return require('postcss')(config.plugins)
          .process(stylesText, {from: input})
          .catch(error => {
            fail(`Error processing CSS via postcss: ${error}`)
          })
          .then(result => result.css)
      }
      fail(`postcss config file at ${postcssConfigFile} must expose "plugins"`)
    } catch (configRequireError) {
      fail(`Error loading postcss config file at ${postcssConfigFile}: ${configRequireError}`)
    }
  } else {
    fail('Could not find "postcss.config.js" in any parent directory, which is required by the postcss preprocessor.')
  }
}

let preprocessSass = (stylesText, input, indentedSyntax = false) => {
  return new Promise((resolve, reject) => {
    try {
      let sass = require('sass')
      let includePaths = [
        path.dirname(input),
        findFileUpward(process.cwd(), 'node_modules'),
        findFileUpward(process.cwd(), 'bower_components'),
      ].filter(Boolean)
      let result

      if (stylesText) {
        result = sass.renderSync({
          data: stylesText,
          file: input,
          includePaths: includePaths,
          indentedSyntax: indentedSyntax,
        })
      } else {
        result = sass.renderSync({
          file: input,
          includePaths: includePaths,
          indentedSyntax: indentedSyntax,
        })
      }

      resolve(result.css.toString('utf8'))
    } catch (error) {
      fail(`While processing ${indentedSyntax ? 'SASS' : 'SCSS'} in ${input}, ${error}`)
    }
  })
}
