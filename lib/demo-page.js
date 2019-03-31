let fs = require('fs')
let fail = require('./fail')
let inputs = require('./inputs')

let render = (sourceBasenames, tagNames, outputFolder, classBased = false) => `<!DOCTYPE html>
<html>
<head>
  <title>Demonstrate ${tagNames.length > 1 ? 'custom elements' : `&lt;${tagNames[0]}&gt;`}</title>${
    classBased
      ? ''
      : `
  <script src="/node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>
  <script src="/node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>`
  }
${sourceBasenames.map(basename => `  <script src="/${outputFolder}/${basename}.${classBased ? 'class' : 'es5'}.js"></script>`).join('\n')}
  <style>
    body {
      background-color: gainsboro;
    }
    body > p {
      border-top: 1px solid gray;
    }
    body > p:first-child {
      border-top: none;
    }
  </style>
</head>
<body>${
  tagNames.map(tagName => `
  <p><code>&lt;${tagName}&gt;&lt;/${tagName}&gt;</code></p>
  <${tagName}></${tagName}>`).join('\n')}
</body>
</html>
`

let writeHtml = (sourceBasenames, tagNames, outputFolder, classBased = false) => {
  let html = render(sourceBasenames, tagNames, outputFolder, classBased)

  if (html) {
    require('./write-to-file').makeOutputFolder(outputFolder)
    fs.writeFileSync(`${outputFolder}/index.${classBased ? 'class' : 'es5'}.html`, html)
  } else {
    fail(`Could not write HTML to outputFolder ${outputFolder}.`)
  }
}

let write = options => {
  let {bundle, input, outputFolder} = options
  let inputStats

  try {
    inputStats = fs.statSync(input)
  } catch (_) {
    fail(`Could not stat input file/directory ${input}`)
  }

  if (inputStats) {
    if (inputStats.isDirectory()) {
      let tagNames = Object.keys(inputs.groupFiles(fs.readdirSync(input)))
      let sourceBasenames = bundle
        ? ['bundle']
        : tagNames

      if (tagNames.length) {
        writeHtml(sourceBasenames, tagNames, outputFolder, false)
        writeHtml(sourceBasenames, tagNames, outputFolder, true)
      } else {
        fail(`Could not find any HTML, CSS, or JS in input directory ${input}`)
      }
    } else if (inputStats.isFile()) {
      let path = require('path')
      let tagNames = [path.basename(input, path.extname(input))]

      writeHtml(tagNames, tagNames, outputFolder, false)
      writeHtml(tagNames, tagNames, outputFolder, true)
    } else {
      fail(`Input ${input} is neither a file nor directory, so I don't know how to make you a demo page!`)
    }
  }
}

module.exports = write
