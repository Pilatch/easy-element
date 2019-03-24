let fileTemplate = body => ({
  type: 'File',
  program: {
    type: 'Program',
    sourceType: 'module',
    interpreter: null,
    body: body,
    directives: [],
  },
  comments: [],
})

module.exports = results => {
  let programBodies = {
    es5: [],
    es6: [],
  }

  results.forEach(result => {
    programBodies.es5 = programBodies.es5.concat(result.es5Ast)
    programBodies.es6 = programBodies.es6.concat(result.es6Ast)
  })

  return {
    es5Ast: fileTemplate(programBodies.es5),
    es6Ast: fileTemplate(programBodies.es6),
    tagName: 'bundle',
  }
}
