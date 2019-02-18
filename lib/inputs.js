let fs = require('fs')
let path = require('path')

let fileInDirectoryByExtension = (directoryContents, extension) => {
  let matches = directoryContents.filter(fileName => fileName.endsWith(extension))

  if (matches.length > 1) {
    console.error(`At most 1 ${extension} file can be in an input directory.`)
    process.exit(1)
  }

  return matches[0] || null
}

let namesFromAny = input => {
  let stat = fs.statSync(input)

  if (stat && stat.isDirectory()) {
    let inputs = fromDirectory(input)

    return {
      className: inputs.className,
      tagName: inputs.tagName,
    }
  } else {
    return fromFile(input)
  }

  return null
}

let fromFile = input => {
  return require('./names')(input, path.extname(input))
}

getCssFile = directoryContents => {
  let cssExtension = null
  let matchingCssFile = null
  let newMatch = null
  let inferredPreprocessor = null

  if (matchingCssFile = fileInDirectoryByExtension(directoryContents, '.css')) {
    cssExtension = '.css'
  }

  if (newMatch = fileInDirectoryByExtension(directoryContents, '.scss')) {
    if (cssExtension) {
      console.error(`Your input directory has both a ${cssExtension} and a .scss file. Only one styles file is allowed.`)
      process.exit(1)
    }
    cssExtension = '.scss'
    inferredPreprocessor = 'scss'
    matchingCssFile = newMatch
  }

  if (newMatch = fileInDirectoryByExtension(directoryContents, '.sass')) {
    if (cssExtension) {
      console.error(`Your input directory has both a ${cssExtension} and a .sass file. Only one styles file is allowed.`)
      process.exit(1)
    }
    cssExtension = '.sass'
    inferredPreprocessor = 'sass'
    matchingCssFile = newMatch
  }

  return {
    matchingCssFile: matchingCssFile,
    cssExtension: cssExtension,
    inferredPreprocessor: inferredPreprocessor
  }
}

let fromDirectory = input => {
  let directoryContents = fs.readdirSync(input)
  let {matchingCssFile, cssExtension, inferredPreprocessor} = getCssFile(directoryContents)
  let matchingJsFile = fileInDirectoryByExtension(directoryContents, '.js')
  let matchingHtmlFile = fileInDirectoryByExtension(directoryContents, '.html')
  let matchingFileNames = [
    matchingCssFile && path.basename(matchingCssFile, cssExtension),
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
    inferredPreprocessor: inferredPreprocessor,
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

  return require('./names')(uniqueFileBasenames[0])
}

let removeDuplicates = array => array.filter(
  (elem, pos) => array.indexOf(elem) === pos
)

module.exports = {
  fromDirectory: fromDirectory,
  fromFile: fromFile,
  names: namesFromAny,
}
