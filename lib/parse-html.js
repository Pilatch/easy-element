let parser = require('node-html-parser')

module.exports = elementHtml => {
  let document = parser.parse(`<html>${elementHtml}</html>`, {
    lowerCaseTagName: true,
    script: true,
    style: true,
    pre: true
  })
  let style = document.querySelector('style')
  let script = document.querySelector('script')
  let template = document.querySelector('template')

  return {
    stylesText: style && style.rawText,
    scriptText: script && script.rawText,
    innerHTML: template && template.innerHTML,
  }
}
