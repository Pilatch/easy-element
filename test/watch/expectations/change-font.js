let fs = require('fs')
let getFontGuy = () => new Promise((resolve, reject) => {
  // XXX: readFileSync is busted because it caches, and we can't have that.
  fs.readFile(
    'dist/font-guy.class.js',
    {encoding: 'utf8', flag: 'rs+'},
    (err, data) => {
      if (err) {
        return reject(err)
      }

      return resolve(data)
    })
})


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
