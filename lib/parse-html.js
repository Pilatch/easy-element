let parser = require('node-html-parser')

module.exports = elementHtml => {
  let document = parser.parse(`<html>${elementHtml}</html>`, {
    lowerCaseTagName: true,
    script: true,
    style: true,
    pre: true
  })

  if (hasOnlyRawText(document.querySelector('html'))) {
    return null
  }

  let style = document.querySelector('style')
  let script = document.querySelector('script')
  let template = document.querySelector('template')

  return {
    stylesText: style && style.rawText,
    scriptText: script && script.rawText,
    innerHTML: template && template.innerHTML,
  }
}

let hasOnlyRawText = element => {
  return element.childNodes.length === 1 && element.childNodes[0].nodeType === 3
}
