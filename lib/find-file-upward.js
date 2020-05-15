let fs = require('fs')
let path = require('path')

let findFileUpward = (directory, filename) => {
  let filePath = path.normalize(`${directory}/${filename}`)

  try {
    fs.statSync(filePath)
    return filePath
  } catch (_) {
    let parentDirectory = path.normalize(`${directory}/..`)

    if (parentDirectory === directory) {
      // That means we can't go back any farther.
      return null
    }

    return findFileUpward(parentDirectory, filename)
  }
}

module.exports = findFileUpward
