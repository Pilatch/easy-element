let path = require('path')
let findFileUpward = require('./find-file-upward')

let mightHaveCssImports = input => input.endsWith('.scss') || input.endsWith('.sass') || input.endsWith('.css')

// Returns an import map where leaf-nodes map to the parent files
// Returns a Promise
let importsToWatch = (input, inputIsDirectory, fail) => {
  if (inputIsDirectory) {
    return require('./recursive-readdir')(input, true, true)
      .then(directoryContents => directoryContents
        .filter(mightHaveCssImports)
        .map(inputFile => _invertImportMap(_singleImportMap(inputFile)))
        .reduce(
          (accumulator, importMap) => {
            Object.keys(importMap).forEach(childFile => {
              if (!accumulator[childFile]) {
                accumulator[childFile] = []
              }

              accumulator[childFile] = accumulator[childFile].concat(importMap[childFile])
            })
            return accumulator
          },
          {}
        )
      )
      .catch(fail)
  }

  if (mightHaveCssImports(input)) {
    return Promise.resolve(_invertImportMap(_singleImportMap(input)))
  }

  return Promise.resolve({})
}

let _singleImportMap = inputFile => {
  let importMap = {}

  try {
    let pathToInputFile = path.resolve(inputFile)
    let inputDir = path.dirname(pathToInputFile)
    let parseOptions = {
      follow: true,
      extensions: ['sass', 'scss', 'css'],
      loadPaths: [
        inputDir,
        findFileUpward(inputDir, 'node_modules'),
        findFileUpward(inputDir, 'bower_components'),
      ].filter(Boolean),
    }
    let importGraph = require('sass-graph').parseFile(inputFile, parseOptions)
    let reducer = (accumulator, currentFilePath) => {
      if (currentFilePath === inputFile) {
        return accumulator
      }

      if (!accumulator[inputFile]) {
        accumulator[inputFile] = []
      }

      accumulator[inputFile].push(currentFilePath)

      return accumulator
    }

    return Object.keys(importGraph.index).reduce(reducer, importMap)
  } catch (_) {
    return importMap
  }
}

let _invertImportMap = importMap => Object
  .keys(importMap)
  .reduce((accumulator, parentFile) => {
    let childFiles = importMap[parentFile]

    return Object.assign(accumulator, childFiles.reduce((childToAncestorMap, childFile) => {
      childToAncestorMap[childFile] = [parentFile].concat(accumulator[childFile] || [])

      return childToAncestorMap
    }, {}))
  }, {})

module.exports = importsToWatch
module.exports._singleImportMap = _singleImportMap
module.exports._invertImportMap = _invertImportMap
