let babel = require('@babel/core')
let parser = require('node-html-parser')

module.exports = (scriptText, tagName, className, outputFolder, innerHTML) => {
  let ast = babel.parseSync(scriptText)

  if (innerHTML) {
    let classes = ast.program.body.filter(
      bodyObject => bodyObject.type === 'ClassDeclaration' && bodyObject.id.name == className
    )

    // TODO handle when there are no classes found that match the className.

    if (classes.length > 1) {
      console.error(`No fair. I can\'t handle more than one class for your ${tagName} custom element.`)
      process.exit(1)
    }

    let connectedCallbacks = classes[0].body.body.filter(
      bodyObject => bodyObject.type === 'ClassMethod' && bodyObject.key.name === 'connectedCallback'
    )

    if (connectedCallbacks.length > 1) {
      console.error(`Duh, I don\'t know what to do with more than one connectedCallback for your ${className} custom element class.`)
      process.exit(1)
    }

    // TODO automatically put in a connectedCallback if one does not exist,
    // and we have a template!!!

    let document = parser.parse(`<html>${innerHTML}</html>`)

    if (document.querySelector('slot')) {
      // console.log('we do not support slots yet!')

//       let slotScript = babel.parseSync(`    var contents = \`
//   <h2 class="name-tag_heading">Hello, my name is</h2>
//   <div class="name-tag_name-container">
//     <slot></slot>
//   </div>
// \`;
//     if (this.childNodes.length) {
//       var template = document.createElement('div');
//       template.innerHTML = contents;
//       var slot = template.querySelector('slot');

//       while (this.childNodes.length) {
//         slot.appendChild(this.firstChild);
//       }

//       this.innerHTML = template.innerHTML;
//     } else {
//       this.innerHTML = contents;
//     }`)

//       console.log('slotScript', JSON.stringify(slotScript, null, '  '))

      require('./set-inner-html-ast').withSlot(innerHTML).reverse().forEach(bodyObject => {
        connectedCallbacks[0].body.body.unshift(bodyObject)
      })
    } else {
      connectedCallbacks[0].body.body.unshift(require('./set-inner-html-ast').withoutSlot(innerHTML))
    }
  }

  require('./transform-ast')(ast, tagName, outputFolder)
}
