let noCacheReadFile = filePath => () => new Promise((resolve, reject) => {
  // XXX: readFileSync is busted because it caches, and we can't have that.
  fs.readFile(
    filePath,
    {encoding: 'utf8', flag: 'rs+'},
    (err, data) => err
      ? reject(err)
      : resolve(data)
  )
})

module.exports = {
  noCacheReadFile: noCacheReadFile,
}
