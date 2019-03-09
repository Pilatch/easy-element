module.exports = [
  {
    'type': 'ClassMethod',
    'static': false,
    'key': {
      'type': 'Identifier',
      'name': '__fillSlot__',
    },
    'computed': false,
    'kind': 'method',
    'id': null,
    'generator': false,
    'async': false,
    'params': [
      {
        'type': 'Identifier',
        'name': 'destinationSlot',
      },
      {
        'type': 'Identifier',
        'name': 'content',
      },
    ],
    'body': {
      'type': 'BlockStatement',
      'body': [
        {
          'type': 'WhileStatement',
          'test': {
            'type': 'MemberExpression',
            'object': {
              'type': 'MemberExpression',
              'object': {
                'type': 'Identifier',
                'name': 'destinationSlot',
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
                      'name': 'destinationSlot',
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
                        'name': 'destinationSlot',
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
          'type': 'ExpressionStatement',
          'expression': {
            'type': 'CallExpression',
            'callee': {
              'type': 'MemberExpression',
              'object': {
                'type': 'Identifier',
                'name': 'destinationSlot',
              },
              'property': {
                'type': 'Identifier',
                'name': 'appendChild',
              },
              'computed': false,
            },
            'arguments': [
              {
                'type': 'Identifier',
                'name': 'content',
              },
            ],
          },
        },
      ],
      'directives': [],
    },
  },
  {
    'type': 'ClassMethod',
    'static': false,
    'key': {
      'type': 'Identifier',
      'name': '__distributeContentToSlots__',
    },
    'computed': false,
    'kind': 'method',
    'id': null,
    'generator': false,
    'async': false,
    'params': [
      {
        'type': 'Identifier',
        'name': 'template',
      },
    ],
    'body': {
      'type': 'BlockStatement',
      'body': [
        {
          'type': 'VariableDeclaration',
          'declarations': [
            {
              'type': 'VariableDeclarator',
              'id': {
                'type': 'Identifier',
                'name': 'lightDomElements',
              },
              'init': {
                'type': 'CallExpression',
                'callee': {
                  'type': 'MemberExpression',
                  'object': {
                    'type': 'ThisExpression',
                  },
                  'property': {
                    'type': 'Identifier',
                    'name': 'querySelectorAll',
                  },
                  'computed': false,
                },
                'arguments': [
                  {
                    'type': 'StringLiteral',
                    'extra': {
                      'rawValue': '[slot]',
                      'raw': "'[slot]'",
                    },
                    'value': '[slot]',
                  },
                ],
              },
            },
          ],
          'kind': 'let',
        },
        {
          'type': 'VariableDeclaration',
          'declarations': [
            {
              'type': 'VariableDeclarator',
              'id': {
                'type': 'Identifier',
                'name': 'namedSlots',
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
                    'name': 'querySelectorAll',
                  },
                  'computed': false,
                },
                'arguments': [
                  {
                    'type': 'StringLiteral',
                    'extra': {
                      'rawValue': 'slot[name]',
                      'raw': "'slot[name]'",
                    },
                    'value': 'slot[name]',
                  },
                ],
              },
            },
          ],
          'kind': 'let',
        },
        {
          'type': 'IfStatement',
          'test': {
            'type': 'BinaryExpression',
            'left': {
              'type': 'MemberExpression',
              'object': {
                'type': 'Identifier',
                'name': 'lightDomElements',
              },
              'property': {
                'type': 'Identifier',
                'name': 'length',
              },
              'computed': false,
            },
            'operator': '>',
            'right': {
              'type': 'MemberExpression',
              'object': {
                'type': 'Identifier',
                'name': 'namedSlots',
              },
              'property': {
                'type': 'Identifier',
                'name': 'length',
              },
              'computed': false,
            },
          },
          'consequent': {
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
                      'name': 'console',
                    },
                    'property': {
                      'type': 'Identifier',
                      'name': 'error',
                    },
                    'computed': false,
                  },
                  'arguments': [
                    {
                      'type': 'TemplateLiteral',
                      'expressions': [
                        {
                          'type': 'CallExpression',
                          'callee': {
                            'type': 'MemberExpression',
                            'object': {
                              'type': 'MemberExpression',
                              'object': {
                                'type': 'ThisExpression',
                              },
                              'property': {
                                'type': 'Identifier',
                                'name': 'tagName',
                              },
                              'computed': false,
                            },
                            'property': {
                              'type': 'Identifier',
                              'name': 'toLowerCase',
                            },
                            'computed': false,
                          },
                          'arguments': [],
                        },
                        {
                          'type': 'MemberExpression',
                          'object': {
                            'type': 'Identifier',
                            'name': 'namedSlots',
                          },
                          'property': {
                            'type': 'Identifier',
                            'name': 'length',
                          },
                          'computed': false,
                        },
                        {
                          'type': 'MemberExpression',
                          'object': {
                            'type': 'Identifier',
                            'name': 'lightDomElements',
                          },
                          'property': {
                            'type': 'Identifier',
                            'name': 'length',
                          },
                          'computed': false,
                        },
                      ],
                      'quasis': [
                        {
                          'type': 'TemplateElement',
                          'value': {
                            'raw': 'The ',
                            'cooked': 'The ',
                          },
                          'tail': false,
                        },
                        {
                          'type': 'TemplateElement',
                          'value': {
                            'raw': ' template has ',
                            'cooked': ' template has ',
                          },
                          'tail': false,
                        },
                        {
                          'type': 'TemplateElement',
                          'value': {
                            'raw': ' <slot> elements, but is being sent ',
                            'cooked': ' <slot> elements, but is being sent ',
                          },
                          'tail': false,
                        },
                        {
                          'type': 'TemplateElement',
                          'value': {
                            'raw': '.\\nOffending element:',
                            'cooked': '.\nOffending element:',
                          },
                          'tail': true,
                        },
                      ],
                    },
                  ],
                },
              },
              {
                'type': 'ExpressionStatement',
                'expression': {
                  'type': 'CallExpression',
                  'callee': {
                    'type': 'MemberExpression',
                    'object': {
                      'type': 'Identifier',
                      'name': 'console',
                    },
                    'property': {
                      'type': 'Identifier',
                      'name': 'log',
                    },
                    'computed': false,
                  },
                  'arguments': [
                    {
                      'type': 'ThisExpression',
                    },
                  ],
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
                  'type': 'CallExpression',
                  'callee': {
                    'type': 'MemberExpression',
                    'object': {
                      'type': 'Identifier',
                      'name': 'namedSlots',
                    },
                    'property': {
                      'type': 'Identifier',
                      'name': 'forEach',
                    },
                    'computed': false,
                  },
                  'arguments': [
                    {
                      'type': 'ArrowFunctionExpression',
                      'id': null,
                      'generator': false,
                      'async': false,
                      'params': [
                        {
                          'type': 'Identifier',
                          'name': 'destinationSlot',
                        },
                      ],
                      'body': {
                        'type': 'BlockStatement',
                        'body': [
                          {
                            'type': 'VariableDeclaration',
                            'declarations': [
                              {
                                'type': 'VariableDeclarator',
                                'id': {
                                  'type': 'Identifier',
                                  'name': 'name',
                                },
                                'init': {
                                  'type': 'CallExpression',
                                  'callee': {
                                    'type': 'MemberExpression',
                                    'object': {
                                      'type': 'Identifier',
                                      'name': 'destinationSlot',
                                    },
                                    'property': {
                                      'type': 'Identifier',
                                      'name': 'getAttribute',
                                    },
                                    'computed': false,
                                  },
                                  'arguments': [
                                    {
                                      'type': 'StringLiteral',
                                      'extra': {
                                        'rawValue': 'name',
                                        'raw': "'name'",
                                      },
                                      'value': 'name',
                                    },
                                  ],
                                },
                              },
                            ],
                            'kind': 'let',
                          },
                          {
                            'type': 'VariableDeclaration',
                            'declarations': [
                              {
                                'type': 'VariableDeclarator',
                                'id': {
                                  'type': 'Identifier',
                                  'name': 'matchingContent',
                                },
                                'init': {
                                  'type': 'CallExpression',
                                  'callee': {
                                    'type': 'MemberExpression',
                                    'object': {
                                      'type': 'ThisExpression',
                                    },
                                    'property': {
                                      'type': 'Identifier',
                                      'name': 'querySelector',
                                    },
                                    'computed': false,
                                  },
                                  'arguments': [
                                    {
                                      'type': 'TemplateLiteral',
                                      'expressions': [
                                        {
                                          'type': 'Identifier',
                                          'name': 'name',
                                        },
                                      ],
                                      'quasis': [
                                        {
                                          'type': 'TemplateElement',
                                          'value': {
                                            'raw': '[slot="',
                                            'cooked': '[slot="',
                                          },
                                          'tail': false,
                                        },
                                        {
                                          'type': 'TemplateElement',
                                          'value': {
                                            'raw': '"]',
                                            'cooked': '"]',
                                          },
                                          'tail': true,
                                        },
                                      ],
                                    },
                                  ],
                                },
                              },
                            ],
                            'kind': 'let',
                          },
                          {
                            'type': 'IfStatement',
                            'test': {
                              'type': 'Identifier',
                              'name': 'matchingContent',
                            },
                            'consequent': {
                              'type': 'BlockStatement',
                              'body': [
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
                                        'name': '__fillSlot__',
                                      },
                                      'computed': false,
                                    },
                                    'arguments': [
                                      {
                                        'type': 'Identifier',
                                        'name': 'destinationSlot',
                                      },
                                      {
                                        'type': 'Identifier',
                                        'name': 'matchingContent',
                                      },
                                    ],
                                  },
                                },
                              ],
                              'directives': [],
                            },
                            'alternate': null,
                          },
                        ],
                        'directives': [],
                      },
                    },
                  ],
                },
              },
            ],
            'directives': [],
          },
        },
      ],
      'directives': [],
    },
  },
]
