let fs = require('fs')
let path = require('path')
let fail = require('./fail')

let fileInDirectoryByExtension = (directoryContents, extension) => {
  let matches = directoryContents.filter(fileName => fileName.endsWith(extension))

  if (matches.length > 1) {
    fail(`At most 1 ${extension} file can be in an input directory.`)
  }

  return matches[0] || null
}

let groupFiles = directoryContents => directoryContents.reduce((accumulator, currentValue) => {
  let tagName = path.basename(currentValue, path.extname(currentValue))
  let group = accumulator[tagName]

  if (!group) {
    accumulator[tagName] = []
  }

  accumulator[tagName].push(currentValue)

  return accumulator
}, {})

let names = input => {
  let stat = fs.statSync(input)

  if (stat && stat.isDirectory()) {
    let inputs = fromDirectory(input)

    return {
      className: inputs.className,
      tagName: inputs.tagName,
    }
  }
  return fromFile(input)
}

let fromFile = input => {
  return require('./names')(input, path.extname(input))
}

let getCssFileFromGroup = group => {
  let matchingCssFile = group.filter(fileName => ['.css', '.scss', '.sass'].includes(path.extname(fileName)))[0] || null
  let cssExtension = (matchingCssFile && path.extname(matchingCssFile)) || null
  let inferredPreprocessor = null

  if (cssExtension && cssExtension !== '.css') {
    inferredPreprocessor = cssExtension.substr(1)
  }

  return {
    matchingCssFile: matchingCssFile,
    cssExtension: cssExtension,
    inferredPreprocessor: inferredPreprocessor
  }
}

// group is an array of file names
let fromFileGroup = (input, group) => {
  let {matchingCssFile, cssExtension, inferredPreprocessor} = getCssFileFromGroup(group)
  let matchingJsFile = fileInDirectoryByExtension(group, '.js')
  let matchingHtmlFile = fileInDirectoryByExtension(group, '.html')
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
    fail(`No .html nor .css nor .js files found in input directory.`)
  }

  if (uniqueFileBasenames.length > 1) {
    fail(`All .html and .css and .js files in the input directory must have the same basename.`)
  }

  return require('./names')(uniqueFileBasenames[0])
}

let removeDuplicates = array => array.filter(
  (elem, pos) => array.indexOf(elem) === pos
)

module.exports = {
  fromFile: fromFile,
  fromFileGroup: fromFileGroup,
  groupFiles: groupFiles,
  names: names,
}
