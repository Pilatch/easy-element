let fs = require('fs')
let path = require('path')
let defaultOptions = {
  input: null,
  outputFolder: 'dist',
}

module.exports = function(options = defaultOptions) {
  let {input, outputFolder} = options

  if (!input) {
    console.error('I can\'t do my thing without an input file or folder.')
    process.exit(1)
  }

  let inputStats = fs.statSync(input)

  if (!inputStats) {
    console.error(`Could not find input file or folder, ${input}`)
    process.exit(1)
  }

  if (inputStats.isDirectory()) {
    let { className, tagName, cssInput, jsInput, htmlInput, cssStats, htmlStats, jsStats } = directoryInputs(input)

    if (!cssStats && !jsStats && !htmlStats) {
      console.error('Expected to find an html and/or css and/or js file in directory.')
      process.exit(1)
    }

    let stylesText, scriptText, innerHTML

    if (htmlStats) {
      let htmlParseResult = require('./lib/parse-html')(fs.readFileSync(htmlInput))

      if (htmlParseResult) {
        stylesText = htmlParseResult.stylesText
        scriptText = htmlParseResult.scriptText
        innerHTML = htmlParseResult.innerHTML

        if (stylesText && cssStats) {
          console.error('Found CSS in both HTML and in a separate file. Please choose one option or the other.')
          process.exit(1)
        }

        if (jsStats && scriptText) {
          console.error('Found JS in both HTML and in a separate file. Please choose one option or the other.')
          process.exit(1)
        }
      }
    }

    if (!stylesText && cssStats) {
      stylesText = fs.readFileSync(cssInput, 'utf8')
    }

    if (!scriptText && jsStats) {
      scriptText = fs.readFileSync(jsInput, 'utf8')
    }

    if (!innerHTML && htmlStats) {
      innerHTML = fs.readFileSync(htmlInput, 'utf8')
    }

    require('./lib/transform')({
      innerHTML: innerHTML,
      scriptText: scriptText,
      stylesText: stylesText,
      className: className,
      tagName: tagName,
      outputFolder: outputFolder,
    })
  } else {
    let fileExtension = path.extname(input.toLowerCase())

    switch (fileExtension) {
      case '.html':
        require('./lib/transform-html')(input, outputFolder)
        break
      case '.css':
        require('./lib/transform-css')(input, outputFolder)
        break
      case '.js':
        require('./lib/transform-js')(input, outputFolder)
        break
      default:
        console.error(`Unsupported input file extension, ${fileExtension}`)
        process.exit(1)
    }
  }
}


let fileInDirectoryByExtension = (directoryContents, extension) => {
  let matches = directoryContents.filter(fileName => fileName.endsWith(extension))

  if (matches.length > 1) {
    console.error(`At most 1 ${extension} file can be in an input directory.`)
    process.exit(1)
  }

  return matches[0] || null
}

let directoryInputs = input => {
  let directoryContents = fs.readdirSync(input)
  let matchingCssFile = fileInDirectoryByExtension(directoryContents, '.css')
  let matchingJsFile = fileInDirectoryByExtension(directoryContents, '.js')
  let matchingHtmlFile = fileInDirectoryByExtension(directoryContents, '.html')
  let matchingFileNames = [
    matchingCssFile && path.basename(matchingCssFile, '.css'),
    matchingJsFile && path.basename(matchingJsFile, '.js'),
    matchingHtmlFile && path.basename(matchingHtmlFile, '.html'),
  ].filter(Boolean)
  let {tagName, className} = namesFromMatchingFiles(matchingFileNames)
  let cssInput = matchingCssFile && `${input}/${matchingCssFile}`
  let jsInput = matchingJsFile && `${input}/${matchingJsFile}`
  let htmlInput = matchingHtmlFile && `${input}/${matchingHtmlFile}`
  let cssStats = matchingCssFile && fs.statSync(cssInput)
  let htmlStats = matchingHtmlFile && fs.statSync(htmlInput)
  let jsStats = matchingJsFile && fs.statSync(jsInput)

  return {
    className: className,
    tagName: tagName,
    cssInput: cssInput,
    jsInput: jsInput,
    htmlInput: htmlInput,
    cssStats: cssStats,
    htmlStats: htmlStats,
    jsStats: jsStats,
  }
}

let namesFromMatchingFiles = (matchingFileNames = []) => {
  let uniqueFileBasenames = removeDuplicates(matchingFileNames)

  if (uniqueFileBasenames.length === 0) {
    console.error(`No .html nor .css nor .js files found in input directory.`)
    process.exit(1)
  }

  if (uniqueFileBasenames.length > 1) {
    console.error(`All .html and .css and .js files in the input directory must have the same basename.`)
    process.exit(1)
  }

  return require('./lib/names')(uniqueFileBasenames[0])
}

let removeDuplicates = array => array.filter(
  (elem, pos) => array.indexOf(elem) === pos
)
