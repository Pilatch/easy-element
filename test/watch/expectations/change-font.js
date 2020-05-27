let fs = require('fs')
let getFontGuy = require('./helpers').noCacheReadFile('dist/font-guy.class.js')
let expectation = callback => () => getFontGuy()
  .then(callback)
  .catch(err => console.error(err) || process.exit(1))

module.exports = {
  before: expectation(fontGuy => {
    assert(fontGuy.includes('Comic Sans MS'))
    assert(!fontGuy.includes('monospace'))
  }),
  after: expectation(fontGuy => {
    assert(!fontGuy.includes('Comic Sans MS'))
    assert(fontGuy.includes('monospace'))
  }),
}
