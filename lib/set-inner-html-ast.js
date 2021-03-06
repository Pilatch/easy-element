let escapeTemplateLiteral = string => string.replace(/\\/g, '\\\\').replace(/`/g, '\\`')

let viaShadow = (innerHTML, stylesText) => {
  let escapedInnerHTML = innerHTML
    ? escapeTemplateLiteral(innerHTML)
    : '<slot></slot>' // Otherwise simple elements that are styles-only wouldn't style their guts.

  try {
    let styleTag = stylesText
      ? `<style>${escapeTemplateLiteral(stylesText)}</style>`
      : ''

    return require('@babel/core').parse(`
      this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = \`${escapedInnerHTML}${styleTag}\`;
    `).program.body
  } catch (error) {
    require('./fail')(`Problem generating innerHTML AST for shadowRoot. ${error}`)
  }
}

let withOneSlot = innerHTML => {
  return [
    {
      'type': 'VariableDeclaration',
      'declarations': [
        {
          'type': 'VariableDeclarator',
          'id': {
            'type': 'Identifier',
            'name': 'contents',
          },
          'init': {
            'type': 'TemplateLiteral',
            'expressions': [],
            'quasis': [
              {
                'type': 'TemplateElement',
                'value': {
                  'raw': innerHTML,
                  'cooked': innerHTML.replace(/`/g, '\\`'),
                },
                'tail': true,
              },
            ],
          },
        },
      ],
      'kind': 'var',
    },
    {
      'type': 'IfStatement',
      'test': {
        'type': 'MemberExpression',
        'object': {
          'type': 'MemberExpression',
          'object': {
            'type': 'ThisExpression',
          },
          'property': {
            'type': 'Identifier',
            'name': 'childNodes',
          },
          'computed': false,
        },
        'property': {
          'type': 'Identifier',
          'name': 'length',
        },
        'computed': false,
      },
      'consequent': {
        'type': 'BlockStatement',
        'body': [
          {
            'type': 'VariableDeclaration',
            'declarations': [
              {
                'type': 'VariableDeclarator',
                'id': {
                  'type': 'Identifier',
                  'name': 'template',
                },
                'init': {
                  'type': 'CallExpression',
                  'callee': {
                    'type': 'MemberExpression',
                    'object': {
                      'type': 'Identifier',
                      'name': 'document',
                    },
                    'property': {
                      'type': 'Identifier',
                      'name': 'createElement',
                    },
                    'computed': false,
                  },
                  'arguments': [
                    {
                      'type': 'StringLiteral',
                      'extra': {
                        'rawValue': 'div',
                        'raw': "'div'",
                      },
                      'value': 'div',
                    },
                  ],
                },
              },
            ],
            'kind': 'var',
          },
          {
            'type': 'ExpressionStatement',
            'expression': {
              'type': 'AssignmentExpression',
              'operator': '=',
              'left': {
                'type': 'MemberExpression',
                'object': {
                  'type': 'Identifier',
                  'name': 'template',
                },
                'property': {
                  'type': 'Identifier',
                  'name': 'innerHTML',
                },
                'computed': false,
              },
              'right': {
                'type': 'Identifier',
                'name': 'contents',
              },
            },
          },
          {
            'type': 'VariableDeclaration',
            'declarations': [
              {
                'type': 'VariableDeclarator',
                'id': {
                  'type': 'Identifier',
                  'name': '__slot__',
                },
                'init': {
                  'type': 'CallExpression',
                  'callee': {
                    'type': 'MemberExpression',
                    'object': {
                      'type': 'Identifier',
                      'name': 'template',
                    },
                    'property': {
                      'type': 'Identifier',
                      'name': 'querySelector',
                    },
                    'computed': false,
                  },
                  'arguments': [
                    {
                      'type': 'StringLiteral',
                      'extra': {
                        'rawValue': '__slot__',
                        'raw': "'slot'",
                      },
                      'value': '__slot__',
                    },
                  ],
                },
              },
            ],
            'kind': 'var',
          },
          {
            'type': 'WhileStatement',
            'test': {
              'type': 'MemberExpression',
              'object': {
                'type': 'MemberExpression',
                'object': {
                  'type': 'Identifier',
                  'name': '__slot__',
                },
                'property': {
                  'type': 'Identifier',
                  'name': 'childNodes',
                },
                'computed': false,
              },
              'property': {
                'type': 'Identifier',
                'name': 'length',
              },
              'computed': false,
            },
            'body': {
              'type': 'BlockStatement',
              'body': [
                {
                  'type': 'ExpressionStatement',
                  'expression': {
                    'type': 'CallExpression',
                    'callee': {
                      'type': 'MemberExpression',
                      'object': {
                        'type': 'Identifier',
                        'name': '__slot__',
                      },
                      'property': {
                        'type': 'Identifier',
                        'name': 'removeChild',
                      },
                      'computed': false,
                    },
                    'arguments': [
                      {
                        'type': 'MemberExpression',
                        'object': {
                          'type': 'Identifier',
                          'name': '__slot__',
                        },
                        'property': {
                          'type': 'Identifier',
                          'name': 'lastChild',
                        },
                        'computed': false,
                      },
                    ],
                  },
                },
              ],
              'directives': [],
            },
          },
          {
            'type': 'WhileStatement',
            'test': {
              'type': 'MemberExpression',
              'object': {
                'type': 'MemberExpression',
                'object': {
                  'type': 'ThisExpression',
                },
                'property': {
                  'type': 'Identifier',
                  'name': 'childNodes',
                },
                'computed': false,
              },
              'property': {
                'type': 'Identifier',
                'name': 'length',
              },
              'computed': false,
            },
            'body': {
              'type': 'BlockStatement',
              'body': [
                {
                  'type': 'ExpressionStatement',
                  'expression': {
                    'type': 'CallExpression',
                    'callee': {
                      'type': 'MemberExpression',
                      'object': {
                        'type': 'Identifier',
                        'name': '__slot__',
                      },
                      'property': {
                        'type': 'Identifier',
                        'name': 'appendChild',
                      },
                      'computed': false,
                    },
                    'arguments': [
                      {
                        'type': 'MemberExpression',
                        'object': {
                          'type': 'ThisExpression',
                        },
                        'property': {
                          'type': 'Identifier',
                          'name': 'firstChild',
                        },
                        'computed': false,
                      },
                    ],
                  },
                },
              ],
              'directives': [],
            },
          },
          {
            'type': 'ExpressionStatement',
            'expression': {
              'type': 'AssignmentExpression',
              'operator': '=',
              'left': {
                'type': 'MemberExpression',
                'object': {
                  'type': 'ThisExpression',
                },
                'property': {
                  'type': 'Identifier',
                  'name': 'innerHTML',
                },
                'computed': false,
              },
              'right': {
                'type': 'MemberExpression',
                'object': {
                  'type': 'Identifier',
                  'name': 'template',
                },
                'property': {
                  'type': 'Identifier',
                  'name': 'innerHTML',
                },
                'computed': false,
              },
            },
          },
        ],
        'directives': [],
      },
      'alternate': {
        'type': 'BlockStatement',
        'body': [
          {
            'type': 'ExpressionStatement',
            'expression': {
              'type': 'AssignmentExpression',
              'operator': '=',
              'left': {
                'type': 'MemberExpression',
                'object': {
                  'type': 'ThisExpression',
                },
                'property': {
                  'type': 'Identifier',
                  'name': 'innerHTML',
                },
                'computed': false,
              },
              'right': {
                'type': 'Identifier',
                'name': 'contents',
              },
            },
          },
        ],
        'directives': [],
      },
    },
  ]
}

let withMultipleSlots = innerHTML => ([
  {
    'type': 'VariableDeclaration',
    'declarations': [
      {
        'type': 'VariableDeclarator',
        'id': {
          'type': 'Identifier',
          'name': 'contents',
        },
        'init': {
          'type': 'TemplateLiteral',
          'expressions': [],
          'quasis': [
            {
              'type': 'TemplateElement',
              'value': {
                'raw': innerHTML,
                'cooked': innerHTML.replace(/`/g, '\\`'),
              },
              'tail': true,
            },
          ],
        },
      },
    ],
    'kind': 'var',
  },
  {
    'type': 'IfStatement',
    'test': {
      'type': 'MemberExpression',
      'object': {
        'type': 'MemberExpression',
        'object': {
          'type': 'ThisExpression',
        },
        'property': {
          'type': 'Identifier',
          'name': 'childNodes',
        },
        'computed': false,
      },
      'property': {
        'type': 'Identifier',
        'name': 'length',
      },
      'computed': false,
    },
    'consequent': {
      'type': 'BlockStatement',
      'body': [
        {
          'type': 'VariableDeclaration',
          'declarations': [
            {
              'type': 'VariableDeclarator',
              'id': {
                'type': 'Identifier',
                'name': 'template',
              },
              'init': {
                'type': 'CallExpression',
                'callee': {
                  'type': 'MemberExpression',
                  'object': {
                    'type': 'Identifier',
                    'name': 'document',
                  },
                  'property': {
                    'type': 'Identifier',
                    'name': 'createElement',
                  },
                  'computed': false,
                },
                'arguments': [
                  {
                    'type': 'StringLiteral',
                    'extra': {
                      'rawValue': 'div',
                      'raw': "'div'",
                    },
                    'value': 'div',
                  },
                ],
              },
            },
          ],
          'kind': 'var',
        },
        {
          'type': 'ExpressionStatement',
          'expression': {
            'type': 'AssignmentExpression',
            'operator': '=',
            'left': {
              'type': 'MemberExpression',
              'object': {
                'type': 'Identifier',
                'name': 'template',
              },
              'property': {
                'type': 'Identifier',
                'name': 'innerHTML',
              },
              'computed': false,
            },
            'right': {
              'type': 'Identifier',
              'name': 'contents',
            },
          },
        },
        {
          'type': 'ExpressionStatement',
          'expression': {
            'type': 'CallExpression',
            'callee': {
              'type': 'MemberExpression',
              'object': {
                'type': 'ThisExpression',
              },
              'property': {
                'type': 'Identifier',
                'name': '__distributeContentToSlots__',
              },
              'computed': false,
            },
            'arguments': [
              {
                'type': 'Identifier',
                'name': 'template',
              },
            ],
          },
        },
        {
          'type': 'ExpressionStatement',
          'expression': {
            'type': 'AssignmentExpression',
            'operator': '=',
            'left': {
              'type': 'MemberExpression',
              'object': {
                'type': 'ThisExpression',
              },
              'property': {
                'type': 'Identifier',
                'name': 'innerHTML',
              },
              'computed': false,
            },
            'right': {
              'type': 'MemberExpression',
              'object': {
                'type': 'Identifier',
                'name': 'template',
              },
              'property': {
                'type': 'Identifier',
                'name': 'innerHTML',
              },
              'computed': false,
            },
          },
        },
      ],
      'directives': [],
    },
    'alternate': {
      'type': 'BlockStatement',
      'body': [
        {
          'type': 'ExpressionStatement',
          'expression': {
            'type': 'AssignmentExpression',
            'operator': '=',
            'left': {
              'type': 'MemberExpression',
              'object': {
                'type': 'ThisExpression',
              },
              'property': {
                'type': 'Identifier',
                'name': 'innerHTML',
              },
              'computed': false,
            },
            'right': {
              'type': 'Identifier',
              'name': 'contents',
            },
          },
        },
      ],
      'directives': [],
    },
  },
])

let withoutSlot = innerHTML => {
  return {
    'type': 'ExpressionStatement',
    'expression': {
      'type': 'AssignmentExpression',
      'operator': '=',
      'left': {
        'type': 'MemberExpression',
        'object': {
          'type': 'ThisExpression',
        },
        'property': {
          'type': 'Identifier',
          'name': 'innerHTML',
        },
        'computed': false,
      },
      'right': {
        'type': 'TemplateLiteral',
        'expressions': [],
        'quasis': [
          {
            'type': 'TemplateElement',
            'value': {
              'raw': innerHTML,
              'cooked': innerHTML.replace(/`/g, '\\`'),
            },
            'tail': true,
          },
        ],
      },
    },
  }
}

module.exports = {
  viaShadow: viaShadow,
  withoutSlot: withoutSlot,
  withOneSlot: withOneSlot,
  withMultipleSlots: withMultipleSlots,
}
