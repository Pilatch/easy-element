module.exports = function(innerHTML) {
  return {
    "type": "ExpressionStatement",
    "start": 68,
    "end": 245,
    "loc": {
      "start": {
        "line": 4,
        "column": 4
      },
      "end": {
        "line": 4,
        "column": 181
      }
    },
    "expression": {
      "type": "AssignmentExpression",
      "start": 68,
      "end": 245,
      "loc": {
        "start": {
          "line": 4,
          "column": 4
        },
        "end": {
          "line": 4,
          "column": 181
        }
      },
      "operator": "=",
      "left": {
        "type": "MemberExpression",
        "start": 68,
        "end": 82,
        "loc": {
          "start": {
            "line": 4,
            "column": 4
          },
          "end": {
            "line": 4,
            "column": 18
          }
        },
        "object": {
          "type": "ThisExpression",
          "start": 68,
          "end": 72,
          "loc": {
            "start": {
              "line": 4,
              "column": 4
            },
            "end": {
              "line": 4,
              "column": 8
            }
          }
        },
        "property": {
          "type": "Identifier",
          "start": 73,
          "end": 82,
          "loc": {
            "start": {
              "line": 4,
              "column": 9
            },
            "end": {
              "line": 4,
              "column": 18
            },
            "identifierName": "innerHTML"
          },
          "name": "innerHTML"
        },
        "computed": false
      },
      "right": {
        "type": "TemplateLiteral",
        "start": 85,
        "end": 245,
        "loc": {
          "start": {
            "line": 4,
            "column": 21
          },
          "end": {
            "line": 4,
            "column": 181
          }
        },
        "expressions": [],
        "quasis": [
          {
            "type": "TemplateElement",
            "start": 86,
            "end": 244,
            "loc": {
              "start": {
                "line": 4,
                "column": 22
              },
              "end": {
                "line": 4,
                "column": 180
              }
            },
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