let fs = require('fs')
let path = require('path')
let yargs = require('yargs')

let argv = yargs.argv
let input = argv.input || argv.i
let outputFolder = argv.output || argv.o || 'dist'

if (!input) {
  console.error('I can\'t do my thing without an input file or folder. Specify one after "--input"')
  process.exit(1)
}

let stats = fs.statSync(input)

if (!stats) {
  console.error(`Could not find input file or folder, ${input}`)
  process.exit(1)
}

if (stats.isDirectory()) {
  console.log('TODO handle directory!')
  // let htmlInput = `${input}/${input}.html`
  // let cssInput = `${input}/${input}.css`
  // let jsInput = `${input}/${input}.js`
  // let cssStat = fs.statSync(cssInput)

  // if (fs.statSync(htmlInput)) {
  //   require('./lib/transform-html')(htmlInput, outputFolder)

  //   if (cssStat) {
  //     require('./lib/copy-input-to-output')(cssInput, outputFolder)
  //   }
  // } else if (cssStat) {

  // }

  // console.log('it is a dir TODO')
  // console.log(path.basename(input))
} else {
  let fileExtension = path.extname(input.toLowerCase())

  switch (fileExtension) {
    case '.html':
      require('./lib/transform-html')(input, outputFolder)
      break
    case '.css':
      require('./lib/transform-css')(input, outputFolder)
      require('./lib/copy-input-to-output')(input, outputFolder)
      break
    case '.js':
      require('./lib/transform-js')(input, outputFolder)
      break
    default:
      console.error(`Unsupported input file extension, ${fileExtension}`)
      process.exit(1)
  }
}
