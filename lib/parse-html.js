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

  let style, script, template

  // Only get top-level nodes, and not those that have been commented out.
  // Were we using a slower, more feature-complete HTML parser,
  // this probably wouldn't be necessary.
  document.querySelector('html').childNodes.forEach(node => {
    switch (node.tagName) {
      case 'style': style = node
        break
      case 'script': script = node
        break
      case 'template': template = node
        break
    }
  })

  if (!style && !script && !template) {
    // There's naught in this file but markup so assume it's all the template.
    template = document.querySelector('html')
  }

  return {
    stylesText: style && (style.rawText.trim() ? style.rawText : null),
    scriptText: script && (script.rawText.trim() ? script.rawText : null),
    innerHTML: template && (template.innerHTML.trim() ? template.innerHTML : null),
    preprocessor: style && style.attributes.preprocessor,
  }
}
