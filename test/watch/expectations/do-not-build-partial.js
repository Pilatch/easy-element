let fs = require('fs')
let uglyRx = /.*ugly.*/i
let expectation = () => {
    fs.readdir('dist', (err, files) => {
      assert(err === null)
      files.forEach(file => assert(!uglyRx.test(file)))
    })
  }

module.exports = {
  before: expectation,
  after: expectation,
}
