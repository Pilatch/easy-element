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
    helpers.buildOneFile(options)
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

let nodeVersionCheck = () => {
  try {
    // Warn the user if they're using old node.
    let nodeMajorVersion = parseInt(process.version.split('.')[0].replace('v', ''))

    if (nodeMajorVersion < 10) {
      console.warn(`WARNING: the watch task may exit unexpectedly with node versions under 10. Yours is ${nodeMajorVersion}`)
    }
  } catch (error) {
    console.error(`Could not parse node major version from ${process.version}`)
  }
}

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
        let splitPath = changedFileName.split(path.sep)

        if (splitPath.length > 2) {
          // TODO use similar logic in build!
          // Probably put a helper function in build-helpers.
          // It's deeply nested, so we'll have to adjust what we consider
          // the changed file's input folder.
          options.input = splitPath.slice(0, -1).join(path.sep)
        }

        let directoryContents = fs.readdirSync(options.input)
        let fileGroups = inputs.groupFiles(directoryContents)
        let tagName = getTagName(changedFileName)
        let group = fileGroups[tagName]

        if (group) {
          if (group.length === 1) {
            console.error(`Building ${tagName} from ${options.input}${path.sep}${group[0]}`)
          } else {
            console.error(`Building ${tagName} from:\n${group.map(
              fileName => `  ${options.input}${path.sep}${fileName}`
            ).join(`\n`)}`)
          }
          try {
            helpers.buildFileGroup(options, group)
          } catch (error) {
            reportError(error)
          }
        } else {
          reportError(`Trouble building ${tagName}. Could not find file group.`)
        }

        // Ignore a changed non-file.
      }
    }
  } else {
    buildInputFile(options, reportError, changedFileName)
  }
}

module.exports = {
  nodeVersionCheck: nodeVersionCheck,
  onAdd: onAdd,
  onChange: onChange,
}
