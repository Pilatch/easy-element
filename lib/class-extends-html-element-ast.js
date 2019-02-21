// TODO consider splitting this into a file/program shell and a class.
module.exports = className => ({
  'type': 'File',
  'program': {
    'type': 'Program',
    'sourceType': 'module',
    'interpreter': null,
    'body': [
      {
        'type': 'ClassDeclaration',
        'id': {
          'type': 'Identifier',
          'name': className,
        },
        'superClass': {
          'type': 'Identifier',
          'name': 'HTMLElement',
        },
        'body': {
          'type': 'ClassBody',
          'body': [],
        },
      },
    ],
    'directives': [],
  },
  'comments': [],
})
