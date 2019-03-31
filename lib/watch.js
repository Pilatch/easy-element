let debounce = require('throttle-debounce').debounce
let fs = require('fs')
let helpers = require('./build-helpers')
let inputs = require('./inputs')
let path = require('path')
let addedTagNames = new Set()
let debouncedBuildAddedFilesInDirectory = null
let debouncedRebuild = null

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

let buildInputFile = (options, reportError, changedFileName) => {
  try {
    console.error(`Building ${changedFileName}`)
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

let onAdd = (options, reportError, inputIsDirectory, rebuild) => changedFileName => {
  if (inputIsDirectory) {
    if (options.bundle) {
      if (!debouncedRebuild) {
        debouncedRebuild = debounce(100, false, rebuild)
      }

      debouncedRebuild()
    } else {
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
  } else {
    buildInputFile(options, reportError, changedFileName)
  }
}

let onChange = (options, reportError, inputIsDirectory, rebuild) => changedFileName => {
  if (inputIsDirectory) {
    if (options.bundle) {
      rebuild()
    } else {
      let changedFileStats = getChangedFileStats(reportError, changedFileName)

      if (changedFileStats && changedFileStats.isFile()) {
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
        // Ignore a changed non-file.
      }
    }
  } else {
    buildInputFile(options, reportError, changedFileName)
  }
}

module.exports = {
  onAdd: onAdd,
  onChange: onChange,
}
