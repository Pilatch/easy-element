let path = require('path')
let toPascalCase = require('to-pascal-case')

module.exports = (input, fileExtension) => {
  let tagName = path.basename(input.toLowerCase(), fileExtension || '')

  if (!tagName.includes('-')) {
    require('./fail')(`Custom element name ${tagName} must include a hyphen!`)
  }

  let className = toPascalCase(tagName)

  return {tagName: tagName, className: className}
}
