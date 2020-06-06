let path = require('path')

module.exports = filePath => {
  let base = path.basename(filePath)

  return base.startsWith('_') || base.startsWith('.')
}
