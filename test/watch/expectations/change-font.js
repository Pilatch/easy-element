let fs = require('fs')
let getFontGuy = require('./helpers').noCacheReadFile('dist/font-guy.class.js')

module.exports = {
  before: () => {
    getFontGuy().then(fontGuy => {
      assert(fontGuy.includes('Comic Sans MS'))
      assert(!fontGuy.includes('monospace'))
    }).catch(err => console.error(err) || process.exit(1))
  },
  after: () => {
    getFontGuy().then(fontGuy => {
      assert(!fontGuy.includes('Comic Sans MS'))
      assert(fontGuy.includes('monospace'))
    }).catch(err => console.error(err) || process.exit(1))
  },
}
