let fs = require('fs')

let render = (tagName, outputFolder) => `<!DOCTYPE html>
<html>
<head>
  <title>ES5 Test &lt;${tagName}&gt;</title>
  <script src="/node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>
  <script src="/node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
  <script src="/${outputFolder}/${tagName}.es5.js"></script>
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
<body>
  <p><code>&lt;${tagName}&gt&lt;/${tagName}&gt;</code></p>
  <${tagName}></${tagName}>
</body>
</html>
`

let write = (input, outputFolder) => {
  let {tagName} = require('./inputs').names(input)

  if (tagName) {
    let html = render(tagName, outputFolder)

    if (html) {
      require('./write-to-file').makeOutputFolder(outputFolder)
      fs.writeFileSync(`${outputFolder}/index.html`, html)
    } else {
      console.error(`Could not produce HTML for you. Sorry. :(`)
      process.exit(1)
    }
  } else {
    console.error(`Could not determine your custom element's tag-name, based on the input "${input}".`)
    process.exit(1)
  }
}

module.exports = write
