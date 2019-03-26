const parser = require('postcss-selector-parser')

let transformFromHost = tagName => selectors => {
  selectors.walk(selector => {
    if (selector.type === 'pseudo' && selector.value === ':host') {
      let elementName = parser.tag({value: tagName})

      selector.parent.insertAfter(selector, elementName)

      if (selector.nodes.length) {
        let previous = elementName

        for (let i = 0; i < selector.nodes.length; i++) {
          selector.parent.insertAfter(previous, selector.nodes[i])
          previous = selector.nodes[i]
        }
      }

      selector.remove()
    }
  })
}

let shouldAppendNodeToHost = node => {
  if (node.type === 'combinator') {
    return false
  }

  if (node.type === 'pseudo') {
    return ![':after', '::after', ':before', '::before'].includes(node.value)
  }

  return true
}

let transformToHost = tagName => selectors => {
  selectors.walk(selector => {
    if (selector.type === 'tag' && selector.value === tagName) {
      let host = parser.pseudo({value: ':host'})
      let next = selector.next()
      let hostSelector

      while (next && shouldAppendNodeToHost(next)) {
        if (!hostSelector) {
          hostSelector = parser.selector()
        }

        let node = next

        next = next.next()
        node.remove()
        hostSelector.append(node)
      }

      if (hostSelector) {
        host.append(hostSelector)
      }

      selector.parent.insertAfter(selector, host)
      selector.remove()
    }
  })
}

module.exports = {
  fromHost: tagName => cssSelector => parser(transformFromHost(tagName)).processSync(cssSelector),
  toHost: tagName => cssSelector => parser(transformToHost(tagName)).processSync(cssSelector),
}
