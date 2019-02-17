let fs = require('fs')
let path = require('path')

// This resolves to a Promise with the CSS in its result...
// or blows up.
module.exports = (preprocessor, stylesText, input) => {
  if (preprocessor === 'postcss') {
    return preprocessPostcss(stylesText, input)
  } else {
    console.error(`Unsupported CSS preprocessor, "${preprocessor}".`)
    process.exit(1)
  }
}

let findFileUpward = (directory, filename) => {
  let filePath = path.normalize(`${directory}/${filename}`)

  try {
    fs.statSync(filePath)
    return filePath
  } catch (_) {
    let parentDirectory = path.normalize(`${directory}/..`)

    if (parentDirectory === directory) {
      // That means we can't go back any farther.
      return null
    }

    return findFileUpward(parentDirectory, filename)
  }
}

let preprocessPostcss = (stylesText, input) => {
  let postcssConfigFile = findFileUpward(process.cwd(), 'postcss.config.js')

  if (postcssConfigFile) {
    try {
      let config = require(postcssConfigFile)

      if (config && config.plugins) {
        return require('postcss')(config.plugins)
          .process(stylesText, {from: input})
          .catch(error => {
            console.error(`Error processing CSS via postcss: ${error}`)
            process.exit(1)
          })
          .then(result => result.css)
      } else {
        console.error(`postcss config file at ${postcssConfigFile} must expose "plugins"`)
        process.exit(1)
      }
    } catch (configRequireError) {
      console.error(`Error loading postcss config file at ${postcssConfigFile}: ${configRequireError}`)
      process.exit(1)
    }
  } else {
    console.error('Could not find "postcss.config.js" in any parent directory, which is required by the postcss preprocessor.')
    process.exit(1)
  }
}