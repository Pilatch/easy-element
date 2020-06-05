let fs = require('fs')
let noCacheReadFile = require('./helpers').noCacheReadFile
let fontGuyPath = 'dist/font-guy.class.js'
let typoNegativePath = 'dist/typo-negative.class.js'
let fail = err => console.error(err) || process.exit(1)
let expectation = (filePath, callback) => noCacheReadFile(filePath)()
  .then(callback)
  .catch(fail)

module.exports = {
  before: () => Promise.all([
    expectation(fontGuyPath, fontGuy => {
      assert(fontGuy.includes('color: #8080ff;'))
      assert(!fontGuy.includes('color: #8080e9;'))
    }),
    expectation(typoNegativePath, typoNegative => {
      assert(typoNegative.includes('color: #80ff80;'))
      assert(!typoNegative.includes('color: #80e980;'))
    })
  ])
  .catch(fail),
  after: () => Promise.all([
    expectation(fontGuyPath, fontGuy => {
      assert(fontGuy.includes('color: #8080e9;'))
      assert(!fontGuy.includes('color: #8080ff;'))
    }),
    expectation(typoNegativePath, typoNegative => {
      assert(typoNegative.includes('color: #80e980;'))
      assert(!typoNegative.includes('color: #80ff80;'))
    })
  ])
  .catch(fail),
}
