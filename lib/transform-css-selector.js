const parser = require('postcss-selector-parser');
// let postcss = require('postcss')

let transform = tagName => selectors => {
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
  toHost: (tagName, cssSelector) => parser(transform(tagName)).processSync(cssSelector),
  fromHost: (tagName, cssSelector) => { /*TODO*/ },
}

// console.log(parser(transform('blue-button')).processSync('blue-button.light button'))
// console.log(parser(transform('me-at')).processSync('div me-at.home[with=family] for #ever'))
// console.log(parser(transform('what-up-dawg')).processSync('div me-at.home[with=family] what-up-dawg #ever'))
