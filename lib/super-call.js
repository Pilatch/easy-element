let ast = {
  'type': 'ExpressionStatement',
  'expression': {
    'type': 'CallExpression',
    'callee': {
      'type': 'Super',
    },
    'arguments': [],
  },
}

let isSuperCall = astBodyNode => astBodyNode.type === 'ExpressionStatement' &&
  astBodyNode.expression &&
  astBodyNode.expression.type === 'CallExpression' &&
  astBodyNode.expression.callee &&
  astBodyNode.expression.callee.type === 'Super'

module.exports = {
  ast: ast,
  isSuperCall: isSuperCall,
}
