let parser = require('node-html-parser')
let parse = (elementHtml) => (parser.parse(
  `<html>${elementHtml}</html>`, {
  lowerCaseTagName: true,
  script: true,
  style: true,
  pre: true
}))
let hasOnlyRawText = document => {
  let element = document.querySelector('html')

  return element.childNodes.length === 1 && element.childNodes[0].nodeType === 3
}

module.exports = elementHtml => {
  let document = parse(elementHtml)

  if (hasOnlyRawText(document)) {
    return null
  }

  let style = document.querySelector('style')
  let script = document.querySelector('script')
  let template = document.querySelector('template')

  if (!style && !script && !template) {
    // There's naught in this file but markup so assume it's all the template.
    template = document.querySelector('html')
  }

  return {
    stylesText: style && style.rawText,
    scriptText: script && script.rawText,
    innerHTML: template && template.innerHTML,
    preprocessor: style && style.attributes.preprocessor,
  }
}
