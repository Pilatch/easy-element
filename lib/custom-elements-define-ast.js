module.exports = (className, tagName) => ({
  "type": "ExpressionStatement",
  "expression": {
    "type": "CallExpression",
    "callee": {
      "type": "MemberExpression",
      "object": {
        "type": "Identifier",
        "name": "window"
      },
      "property": {
        "type": "Identifier",
        "name": "addEventListener"
      },
      "computed": false
    },
    "arguments": [
      {
        "type": "StringLiteral",
        "extra": {
          "rawValue": "WebComponentsReady",
          "raw": "'WebComponentsReady'"
        },
        "value": "WebComponentsReady"
      },
      {
        "type": "FunctionExpression",
        "id": null,
        "generator": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "body": [
            {
              "type": "ExpressionStatement",
              "expression": {
                "type": "CallExpression",
                "callee": {
                  "type": "MemberExpression",
                  "object": {
                    "type": "Identifier",
                    "name": "customElements"
                  },
                  "property": {
                    "type": "Identifier",
                    "name": "define"
                  },
                  "computed": false
                },
                "arguments": [
                  {
                    "type": "StringLiteral",
                    "extra": {
                      "rawValue": tagName,
                      "raw": `'${tagName}'`
                    },
                    "value": tagName
                  },
                  {
                    "type": "Identifier",
                    "name": className
                  }
                ]
              }
            }
          ],
          "directives": []
        }
      }
    ]
  }
})