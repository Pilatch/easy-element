// Yes, we could use the recursive-readdir NPM module,
// but we already have chokidar so let's not add another dependency
module.exports = input => new Promise(
  (resolve, reject) => {
    try {
      paths = []
      watcher = require('chokidar').watch(input)
      watcher.on('add', path => paths.push(path))
      watcher.on('ready', () => {
        resolve(paths)
        setTimeout(() => watcher.close(), 0)
      })
    } catch (error) {
      reject(error)
    }
  }
)
