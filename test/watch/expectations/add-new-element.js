// one-point-five
let fs = require('fs')
let filePath = 'dist/one-point-five.class.js'
let readOnePointFive = require('./helpers').noCacheReadFile(filePath)

module.exports = {
  before: () => readOnePointFive()
    .then(_ => console.error(`${filePath} should not exist`) || process.exit(1))
    .catch(_ => {})
  ,
  after: () => readOnePointFive()
    .catch(_ => console.error(`${filePath} should exist`) || process.exit(1))
    .then(data => {
      assert(data.includes('font-size: 1.5em;'))
    })
    .catch(err => console.error(err) || process.exit(1))
}
