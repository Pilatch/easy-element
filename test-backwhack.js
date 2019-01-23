let babel = require('@babel/core')
// let ast = require('@babel/core').parse(`var foo = "\\\\e612"`)
// let ast = babel.parse('var foo = `\\\\e612`')
let ast = babel.parse('let foo = `\\e612bar`; console.log(foo)')

delete ast.program.body[0].declarations[0].init.quasis[0].value.cooked

console.log(ast.program.body[0].declarations[0].init.quasis[0])

console.log(babel.transformFromAstSync(ast).code )