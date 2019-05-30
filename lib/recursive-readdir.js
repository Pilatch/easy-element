let path = require('path')

// Yes, we could use the recursive-readdir NPM module,
// but we already have chokidar so let's not add another dependency
module.exports = (input, ignorePartials = false) => new Promise(
  (resolve, reject) => {
    try {
      filePaths = []
      watcher = require('chokidar').watch(input)
      watcher.on('add', addPath(filePaths, ignorePartials))
      watcher.on('ready', () => {
        resolve(filePaths)
        setTimeout(() => watcher.close(), 0)
      })
    } catch (error) {
      reject(error)
    }
  }
)

let addPath = (filePaths, ignorePartials) => {
  if (ignorePartials) {
    return filePath => {
      if (!path.basename(filePath).startsWith('_')) {
        filePaths.push(filePath)
      }
    }
  }

  return filePath => filePaths.push(filePath)
}
