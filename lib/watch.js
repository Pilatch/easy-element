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

    return helpers
      .buildFileGroup(options, group)
  }

  fail(`Trouble building ${tagName}. Could not find file group.`)
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

let onAdd = (options, inputIsDirectory, getImportMap, rebuild, updateWatcher) => changedFileName => {
  if (readyFired && !updateWatcher.isRunning) {
    let resolvedChangedFileName = path.resolve(changedFileName)
    let parentFiles = getImportMap()[resolvedChangedFileName]

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
    // }
  }
}

let buildingChangedCache = {
  // resolvedChangedFileName: true
}

let onChange = (options, inputIsDirectory, getImportMap, rebuild, updateWatcher) => changedFileName => {
  let resolvedChangedFileName = path.resolve(changedFileName)

  if (buildingChangedCache[resolvedChangedFileName]) {
    return
  }

  let done = () => delete buildingChangedCache[resolvedChangedFileName]
  let doneAndRethrow = err => {
    done()
    throw err
  }

  // We think we can end up building the same path twice because our importMap has absolute paths,
  // and when the watcher starts it can have relative paths for those imports,
  // so onChange can happen twice in those cases.
  buildingChangedCache[resolvedChangedFileName] = true

  if (inputIsDirectory) {
    if (options.bundle) {
      // Gotta build the whole bundle.
      return rebuild()
        .then(done)
        .catch(doneAndRethrow)
    }
    // Only build the group the changed file is in.
    let changedFileStats = getChangedFileStats(changedFileName)

    if (changedFileStats && changedFileStats.isFile()) {
      let parentsOfImportFile = getImportMap()[changedFileName]

      if (parentsOfImportFile) {
        return Promise.all(
          parentsOfImportFile.map(buildChangedGroup(options))
        )
          .then(updateWatcher)
          .then(done)
          .catch(doneAndRethrow)
      }

      if (!isPartial(changedFileName)) {
        return buildChangedGroup(options)(changedFileName)
          .then(updateWatcher)
          .then(done)
          .catch(doneAndRethrow)
      }

      // Ignore a changed non-file, or a changed partial without a parent that imports it.
      done()
    }
  } else {
    return buildInputFile(options)
      .then(updateWatcher)
      .then(done)
      .catch(doneAndRethrow)
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
