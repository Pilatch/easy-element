let isPartial = require('./is-partial')

// Yes, we could use the recursive-readdir NPM module,
// but we already have chokidar so let's not add another dependency
// The waitForWatcherClose boolean parameter is useful so you don't get chokidar collisions
// which is especially necessary in watch mode.  That's what I get for this janky solution. -_-
module.exports = (input, ignorePartials = false, waitForWatcherClose = false) => new Promise(
  (resolve, reject) => {
    try {
      let filePaths = []
      let watcher = require('chokidar').watch(input)

      watcher.on('add', addPath(filePaths, ignorePartials))
      watcher.on('ready', () => {
        if (waitForWatcherClose) {
          watcher.close()
          resolve(filePaths)
        } else {
          resolve(filePaths)
          setTimeout(() => {
            watcher.close()
          }, 0)
        }
      })
    } catch (error) {
      reject(error)
    }
  }
)

let addPath = (filePaths, ignorePartials) => {
  if (ignorePartials) {
    return filePath => {
      if (!isPartial(filePath)) {
        filePaths.push(filePath)
      }
    }
  }

  return filePath => filePaths.push(filePath)
}
