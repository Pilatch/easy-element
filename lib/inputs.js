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

let fromDirectory = input => {
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

  return require('./names')(uniqueFileBasenames[0])
}

let removeDuplicates = array => array.filter(
  (elem, pos) => array.indexOf(elem) === pos
)

module.exports = {
  fromDirectory: fromDirectory,
}