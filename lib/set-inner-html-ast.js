module.exports = function(innerHTML) {
  return {
    "type": "ExpressionStatement",
    "expression": {
      "type": "AssignmentExpression",
      "operator": "=",
      "left": {
        "type": "MemberExpression",
        "object": {
          "type": "ThisExpression",
        },
        "property": {
          "type": "Identifier",
          "name": "innerHTML"
        },
        "computed": false
      },
      "right": {
        "type": "TemplateLiteral",
        "expressions": [],
        "quasis": [
          {
            "type": "TemplateElement",
            "value": {
              "raw": innerHTML,
              "cooked": innerHTML.replace(/`/g, '\\`')
            },
            "tail": true
          }
        ]
      }
    }
  }
}