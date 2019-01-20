const parser = require('postcss-selector-parser');

let transformToHost = tagName => selectors => {
  selectors.walk(selector => {
    if (selector.type === 'tag' && selector.value === tagName) {
      let host = parser.pseudo({value: ':host'})
      let next = selector.next()
      let hostSelector

      while (next && next.type !== 'combinator') {
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
  toHost: tagName => cssSelector => parser(transformToHost(tagName)).processSync(cssSelector),
  fromHost: tagName => cssSelector => { /*TODO*/ },
}
