let parse = require('@babel/core').parse
let escapeTemplateLiteral = string => string.replace(/`/g, "\\`").replace(/\\/g, '\\\\')

let viaShadow = (innerHTML, stylesText) => {
  return parse(`
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = \`${escapeTemplateLiteral(innerHTML)}${
      stylesText
      ? `<style>${escapeTemplateLiteral(stylesText)}</style>`
      : ''
    }\`;
  `).program.body
}

let withSlot = innerHTML => {
  return [
      {
        "type": "VariableDeclaration",
        "declarations": [
          {
            "type": "VariableDeclarator",
            "id": {
              "type": "Identifier",
              "name": "contents"
            },
            "init": {
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
        ],
        "kind": "var"
      },
    {
      "type": "IfStatement",
      "test": {
        "type": "MemberExpression",
        "object": {
          "type": "MemberExpression",
          "object": {
            "type": "ThisExpression",
          },
          "property": {
            "type": "Identifier",
            "name": "childNodes"
          },
          "computed": false
        },
        "property": {
          "type": "Identifier",
          "name": "length"
        },
        "computed": false
      },
      "consequent": {
        "type": "BlockStatement",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "template"
                },
                "init": {
                  "type": "CallExpression",
                  "callee": {
                    "type": "MemberExpression",
                    "object": {
                      "type": "Identifier",
                      "name": "document"
                    },
                    "property": {
                      "type": "Identifier",
                      "name": "createElement"
                    },
                    "computed": false
                  },
                  "arguments": [
                    {
                      "type": "StringLiteral",
                      "extra": {
                        "rawValue": "div",
                        "raw": "'div'"
                      },
                      "value": "div"
                    }
                  ]
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "AssignmentExpression",
              "operator": "=",
              "left": {
                "type": "MemberExpression",
                "object": {
                  "type": "Identifier",
                  "name": "template"
                },
                "property": {
                  "type": "Identifier",
                  "name": "innerHTML"
                },
                "computed": false
              },
              "right": {
                "type": "Identifier",
                "name": "contents"
              }
            }
          },
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "slot"
                },
                "init": {
                  "type": "CallExpression",
                  "callee": {
                    "type": "MemberExpression",
                    "object": {
                      "type": "Identifier",
                      "name": "template"
                    },
                    "property": {
                      "type": "Identifier",
                      "name": "querySelector"
                    },
                    "computed": false
                  },
                  "arguments": [
                    {
                      "type": "StringLiteral",
                      "extra": {
                        "rawValue": "slot",
                        "raw": "'slot'"
                      },
                      "value": "slot"
                    }
                  ]
                }
              }
            ],
            "kind": "var"
          },
          {
            "type": "WhileStatement",
            "test": {
              "type": "MemberExpression",
              "object": {
                "type": "MemberExpression",
                "object": {
                  "type": "Identifier",
                  "name": "slot"
                },
                "property": {
                  "type": "Identifier",
                  "name": "childNodes"
                },
                "computed": false
              },
              "property": {
                "type": "Identifier",
                "name": "length"
              },
              "computed": false
            },
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
                        "name": "slot"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "removeChild"
                      },
                      "computed": false
                    },
                    "arguments": [
                      {
                        "type": "MemberExpression",
                        "object": {
                          "type": "Identifier",
                          "name": "slot"
                        },
                        "property": {
                          "type": "Identifier",
                          "name": "lastChild"
                        },
                        "computed": false
                      }
                    ]
                  }
                }
              ],
              "directives": []
            }
          },
          {
            "type": "WhileStatement",
            "test": {
              "type": "MemberExpression",
              "object": {
                "type": "MemberExpression",
                "object": {
                  "type": "ThisExpression",
                },
                "property": {
                  "type": "Identifier",
                  "name": "childNodes"
                },
                "computed": false
              },
              "property": {
                "type": "Identifier",
                "name": "length"
              },
              "computed": false
            },
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
                        "name": "slot"
                      },
                      "property": {
                        "type": "Identifier",
                        "name": "appendChild"
                      },
                      "computed": false
                    },
                    "arguments": [
                      {
                        "type": "MemberExpression",
                        "object": {
                          "type": "ThisExpression",
                        },
                        "property": {
                          "type": "Identifier",
                          "name": "firstChild"
                        },
                        "computed": false
                      }
                    ]
                  }
                }
              ],
              "directives": []
            }
          },
          {
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
                "type": "MemberExpression",
                "object": {
                  "type": "Identifier",
                  "name": "template"
                },
                "property": {
                  "type": "Identifier",
                  "name": "innerHTML"
                },
                "computed": false
              }
            }
          }
        ],
        "directives": []
      },
      "alternate": {
        "type": "BlockStatement",
        "body": [
          {
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
                "type": "Identifier",
                "name": "contents"
              }
            }
          }
        ],
        "directives": []
      }
    }
  ]
}

let withoutSlot = innerHTML => {
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

module.exports = {
  viaShadow: viaShadow,
  withoutSlot: withoutSlot,
  withSlot: withSlot,
}