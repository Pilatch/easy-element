let fs = require('fs')
let helpers = require('./build-helpers')
let fail = require('./fail')
let inputs = require('./inputs')
let isPartial = require('./is-partial')
let path = require('path')
let readyFired = false

// Returns a promise
let buildInputFile = options => {
  console.error(`Building ${options.input}`)
  return helpers.buildOneFile(options)
}

let buildChangedGroup = options => changedFileName => {
  let {group, tagName} = changedFileGroupAndTagName(options, changedFileName)

  if (group) {
    if (group.length === 1) {
      console.error(`Building ${tagName} from ${options.input}${path.sep}${group[0]}`)
    } else {
      console.error(`Building ${tagName} from:\n${group.map(
        fileName => `  ${options.input}${path.sep}${fileName}`
      ).join(`\n`)}`)
    }

    helpers
      .buildFileGroup(options, group)
  } else {
    fail(`Trouble building ${tagName}. Could not find file group.`)
  }
}

let changedFileGroupAndTagName = (options, changedFileName) => {
  let splitPath = changedFileName.split(path.sep)

  if (splitPath.length > 2) {
    options.input = splitPath.slice(0, -1).join(path.sep)
  }

  let directoryContents = fs.readdirSync(options.input)
  let fileGroups = inputs.groupFiles(directoryContents)
  let tagName = getTagName(changedFileName)

  return {
    tagName: tagName,
    group: fileGroups[tagName],
  }
}

let getChangedFileStats = (changedFileName) => {
  let changedFileStats = null

  try {
    changedFileStats = fs.statSync(changedFileName)
  } catch (error) {
    fail(`Could not stat ${changedFileName} which just changed.`)
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

let onAdd = (options, inputIsDirectory, getImportMap, rebuild, notYetWatched, updateWatcher) => changedFileName => {
  if (readyFired && !updateWatcher.isRunning) {
    let resolvedChangedFileName = path.resolve(changedFileName)
    let parentFiles = getImportMap()[resolvedChangedFileName]

    if (notYetWatched(changedFileName) && notYetWatched(resolvedChangedFileName)) {
      // If it is watched, onChange will handle it automatically.
      if (parentFiles) {
        // It's an imported file.  Let onChange figure it out.
        return onChange(options, inputIsDirectory, getImportMap, rebuild, updateWatcher)(resolvedChangedFileName)
      }

      if (inputIsDirectory) {
        // Build the whole darn thing, because who knows.
        return rebuild()
          .then(updateWatcher)
      }

      // We're watching a single file.
      // XXX: How would this ever happen if it's not yet watched, and we're adding that file?
      // return buildInputFile(options)
      //   .then(updateWatcher)
    }
  }
}

let onChange = (options, inputIsDirectory, getImportMap, rebuild, updateWatcher) => changedFileName => {
  if (path.resolve(changedFileName) !== changedFileName) {
    // We think this can happen because our importMap has absolute paths,
    // and when the watcher starts it can have relative paths for those imports,
    // so onChange can happen twice in those cases.
    return
  }

  if (inputIsDirectory) {
    if (options.bundle) {
      // Gotta build the whole bundle.
      rebuild()
    } else {
      // Only build the group the changed file is in.
      let changedFileStats = getChangedFileStats(changedFileName)

      if (changedFileStats && changedFileStats.isFile()) {
        let parentsOfImportFile = getImportMap()[changedFileName]

        if (parentsOfImportFile) {
          Promise.all(
            parentsOfImportFile.map(buildChangedGroup(options))
          ).then(updateWatcher)
        } else if (!isPartial(changedFileName)) {
          buildChangedGroup(options)(changedFileName)
            .then(updateWatcher)
        }

        // Ignore a changed non-file, or a changed partial without a parent that imports it.
      }
    }
  } else {
    buildInputFile(options)
      .then(updateWatcher)
  }
}

let onReady = (options, inputIsDirectory, rebuild) => () => {
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
