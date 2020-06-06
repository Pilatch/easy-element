// We just check the log on this one because we don't expect the output to change,
// because we're not substituting in the value of the --my-red variable
// because we're not using PostCSS to fill in the imports.
// But we do expect the log to say that text-alicious was built.

module.exports = {
  before: () => {},
  after: () => {},
}
