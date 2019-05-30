let fs = require('fs')
let helpers = require('./build-helpers')
let inputs = require('./inputs')
let path = require('path')
let readyFired = false

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
  if (readyFired) {
    return rebuild()
  }

  if (!inputIsDirectory) {
    // We're watching a single file. May as well build it immediately.
    buildInputFile(options, reportError, changedFileName)
  }
}

let onChange = (options, reportError, inputIsDirectory, rebuild) => changedFileName => {
  if (inputIsDirectory) {
    if (options.bundle) {
      // Gotta build the whole bundle.
      rebuild()
    } else {
      // Only build the group the changed file is in.
      let changedFileStats = getChangedFileStats(reportError, changedFileName)

      if (changedFileStats && changedFileStats.isFile()) {
        let splitPath = changedFileName.split(path.sep)

        if (splitPath.length > 2) {
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

let onReady = (options, reportError, inputIsDirectory, rebuild) => () => {
  readyFired = true

  if (inputIsDirectory) {
    rebuild()
  }
}

module.exports = {
  nodeVersionCheck: nodeVersionCheck,
  onAdd: onAdd,
  onChange: onChange,
  onReady: onReady,
}
