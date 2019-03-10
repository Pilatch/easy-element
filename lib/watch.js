let fs = require('fs')
let inputs = require('./inputs')
let path = require('path')

let onChange = (build, options, reportError, inputStats) => changedFileName => {
  if (inputStats.isDirectory()) { // TODO move this out
    let changedFileStats

    try {
      changedFileStats = fs.statSync(changedFileName)
    } catch (error) {
      reportError(`Could not stat ${changedFileName} which just changed.`)
    }

    if (changedFileStats) {
      if (changedFileStats.isFile()) {
        let directoryContents = fs.readdirSync(options.input)
        let fileGroups = inputs.groupFiles(directoryContents)
        let basename = path.basename(changedFileName, path.extname(changedFileName))
        let group = fileGroups[basename]

        try {
          console.error(`Building ${basename} from: ${group.join(', ')}`)
          require('./build-helpers').buildFileGroup(options, group)
        } catch (error) {
          reportError(error)
        }
      }
      // Ignore a changed non-file, non-directory.
    }
  } else if (inputStats.isFile()) {
    try {
      require('./build-helpers').buildOneFile(changedFileName, options.outputFolder, options.preprocessor)
    } catch (error) {
      reportError(error)
    }
  } else {
    reportError(`Input ${options.input} is neither a file nor directory. So I dunno what to do with it.`)
  }

  // When a file changes,
  // wait briefly. Store all files changed in a list.
  // After the waiting period is over, run a build on all the file groups in that list.
  // That means looking in the same directory for files with the same basename,
  // then running a build on that group.
}

module.exports = {
  onChange: onChange,
}
