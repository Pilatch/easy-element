module.exports = [
  {
    'type': 'ClassMethod',
    'static': false,
    'key': {
      'type': 'Identifier',
      'name': 'querySelector',
    },
    'computed': false,
    'kind': 'method',
    'id': null,
    'generator': false,
    'async': false,
    'params': [
      {
        'type': 'Identifier',
        'name': 'selector',
      },
    ],
    'body': {
      'type': 'BlockStatement',
      'body': [
        {
          'type': 'ReturnStatement',
          'argument': {
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
                  'name': 'shadowRoot',
                },
                'computed': false,
              },
              'property': {
                'type': 'Identifier',
                'name': 'querySelector',
              },
              'computed': false,
            },
            'arguments': [
              {
                'type': 'Identifier',
                'name': 'selector',
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
      'name': 'querySelectorAll',
    },
    'computed': false,
    'kind': 'method',
    'id': null,
    'generator': false,
    'async': false,
    'params': [
      {
        'type': 'Identifier',
        'name': 'selector',
      },
    ],
    'body': {
      'type': 'BlockStatement',
      'body': [
        {
          'type': 'ReturnStatement',
          'argument': {
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
                  'name': 'shadowRoot',
                },
                'computed': false,
              },
              'property': {
                'type': 'Identifier',
                'name': 'querySelectorAll',
              },
              'computed': false,
            },
            'arguments': [
              {
                'type': 'Identifier',
                'name': 'selector',
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
      'name': 'addEventListener',
    },
    'computed': false,
    'kind': 'method',
    'id': null,
    'generator': false,
    'async': false,
    'params': [],
    'body': {
      'type': 'BlockStatement',
      'body': [
        {
          'type': 'ReturnStatement',
          'argument': {
            'type': 'CallExpression',
            'callee': {
              'type': 'MemberExpression',
              'object': {
                'type': 'MemberExpression',
                'object': {
                  'type': 'MemberExpression',
                  'object': {
                    'type': 'ThisExpression',
                  },
                  'property': {
                    'type': 'Identifier',
                    'name': 'shadowRoot',
                  },
                  'computed': false,
                },
                'property': {
                  'type': 'Identifier',
                  'name': 'addEventListener',
                },
                'computed': false,
              },
              'property': {
                'type': 'Identifier',
                'name': 'apply',
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
                  'name': 'shadowRoot',
                },
                'computed': false,
              },
              {
                'type': 'Identifier',
                'name': 'arguments',
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
      'name': 'dispatchEvent',
    },
    'computed': false,
    'kind': 'method',
    'id': null,
    'generator': false,
    'async': false,
    'params': [
      {
        'type': 'Identifier',
        'name': 'event',
      },
    ],
    'body': {
      'type': 'BlockStatement',
      'body': [
        {
          'type': 'ReturnStatement',
          'argument': {
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
                  'name': 'shadowRoot',
                },
                'computed': false,
              },
              'property': {
                'type': 'Identifier',
                'name': 'dispatchEvent',
              },
              'computed': false,
            },
            'arguments': [
              {
                'type': 'Identifier',
                'name': 'event',
              },
            ],
          },
        },
      ],
      'directives': [],
    },
  },
]
