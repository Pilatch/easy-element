let debounce = require('throttle-debounce').debounce
let fs = require('fs')
let helpers = require('./build-helpers')
let inputs = require('./inputs')
let path = require('path')
let addedTagNames = new Set()
let debouncedBuildAddedFilesInDirectory = null

let buildAddedFilesInDirectory = options => {
  let directoryContents = fs.readdirSync(options.input)
  let fileGroups = inputs.groupFiles(directoryContents)

  addedTagNames.forEach(tagName => {
    let group = fileGroups[tagName]

    addedTagNames.delete(tagName)
    if (group) {
      console.error(`Building ${tagName} from: ${group.join(', ')}`)
      helpers.buildFileGroup(options, group)
    }
  })
}

let buildInputFile = (options, changedFileName) => {
  try {
    helpers.buildOneFile(changedFileName, options.outputFolder, options.preprocessor)
  } catch (error) {
    reportError(error)
  }
}

let getChangedFileStats = (reportError, changedFileName) => {
  let changedFileStats = null

  try {
    changedFileStats = fs.statSync(changedFileName)
  } catch (error) {
    reportError(`Could not stat ${changedFileName} which just changed.`)
  }

  return changedFileStats
}

let getTagName = changedFileName => path.basename(changedFileName, path.extname(changedFileName))

let onAdd = (options, reportError, inputStats) => changedFileName => {
  if (inputStats.isFile()) {
    buildInputFile(options, changedFileName)
  } else if (inputStats.isDirectory()) {
    // A whole bunch of files could have been "added" at once on startup.
    let changedFileStats = getChangedFileStats(reportError, changedFileName)

    if (changedFileStats && changedFileStats.isFile()) {
      addedTagNames.add(getTagName(changedFileName))
      if (!debouncedBuildAddedFilesInDirectory) {
        debouncedBuildAddedFilesInDirectory = debounce(100, false, () => buildAddedFilesInDirectory(options))
      }

      debouncedBuildAddedFilesInDirectory()
    }
  }
  // Ignore added non-file, non-directory
}

let onChange = (options, reportError, inputStats) => changedFileName => {
  if (inputStats.isDirectory()) {
    let changedFileStats = getChangedFileStats(reportError, changedFileName)

    if (changedFileStats) {
      if (changedFileStats.isFile()) {
        let directoryContents = fs.readdirSync(options.input)
        let fileGroups = inputs.groupFiles(directoryContents)
        let tagName = getTagName(changedFileName)
        let group = fileGroups[tagName]

        try {
          console.error(`Building ${tagName} from: ${group.join(', ')}`)
          helpers.buildFileGroup(options, group)
        } catch (error) {
          reportError(error)
        }
      }
      // Ignore a changed non-file, non-directory.
    }
  } else if (inputStats.isFile()) {
    buildInputFile(options, changedFileName)
  } else {
    reportError(`Input ${options.input} is neither a file nor directory. So I dunno what to do with it.`)
  }
}

module.exports = {
  onAdd: onAdd,
  onChange: onChange,
}
