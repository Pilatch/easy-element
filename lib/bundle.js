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
  let programBodies = results.reduce((accumulator, result) => {
    accumulator.es5 = accumulator.es5.concat(result.es5Ast)
    accumulator.es6 = accumulator.es5.concat(result.es6Ast)

    return accumulator
  }, {
    es5: [],
    es6: [],
  })

  return {
    es5Ast: fileTemplate(programBodies.es5),
    es6Ast: fileTemplate(programBodies.es6),
  }
}
