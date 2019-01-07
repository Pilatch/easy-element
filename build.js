let yargs = require('yargs')
let argv = yargs.argv
let babel = require('@babel/core')
let parser = require('node-html-parser')
let fs = require('fs')
let path = require('path')
let toPascalCase = require('to-pascal-case')

let input = argv.input || argv.i
let outputFolder = argv.output || argv.o || 'dist'

if (!input) {
  console.error('I can\'t do my thing without an input file or folder. Specify one after "--input"')
  process.exit(1)
}

let tagName = path.basename(input, '.html')
let className = toPascalCase(tagName)
let elementHtml = fs.readFileSync(input)

if (!elementHtml) {
  console.error('No HTML found from the input.')
  process.exit(1)
}

let document = parser.parse(`<html>${elementHtml}</html>`, {
  lowerCaseTagName: true,
  script: true,
  style: true,
  pre: true
})
let style = document.querySelector('style')
let script = document.querySelector('script')
let template = document.querySelector('template')

if (style && style.rawText) {
  fs.writeFileSync(`${outputFolder}/${tagName}.css`, style.rawText.trim() + '\n')
}

if (script && script.rawText) {
  let ast = babel.parseSync(script.rawText)
  let classes = ast.program.body.filter(
    bodyObject => bodyObject.type === 'ClassDeclaration' && bodyObject.id.name == className
  )

  // TODO handle when there are no classes found that match the className.

  if (classes.length > 1) {
    console.error('No fair. I can\'t handle more than one class for your custom element.')
    process.exit(1)
  }

  let connectedCallbacks = classes[0].body.body.filter(
    bodyObject => bodyObject.type === 'ClassMethod' && bodyObject.key.name === 'connectedCallback'
  )

  if (connectedCallbacks.length > 1) {
    console.error('Duh, I don\'t know what to do with more than one connectedCallback for your custom element class.')
    process.exit(1)
  }

  let setInnerHtmlAst = require('./lib/set-inner-html-ast')

  connectedCallbacks[0].body.body.unshift(setInnerHtmlAst(template.innerHTML))

  let classResult = babel.transformFromAstSync(ast)

  if (classResult.code) {
    fs.writeFileSync(`${outputFolder}/${tagName}.class.js`, classResult.code)
  }

  let es5Result = babel.transformFromAstSync(ast, null, {configFile: `${__dirname}/.babelrc`})

  if (es5Result.code) {
    fs.writeFileSync(`${outputFolder}/${tagName}.es5.js`, es5Result.code)
  }

  // TODO handle there being no connectedCallback, but a template

  // TODO if there is no superclass, make it HTMLElement (probably without the start and end tho)
  // superClass:
  //  Node {
  //    type: 'Identifier',
  //    start: 25,
  //    end: 36,
  //    loc: [SourceLocation],
  //    name: 'HTMLElement' },
}