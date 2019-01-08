let path = require('path')
let toPascalCase = require('to-pascal-case')

module.exports = (input, fileExtension) => {
  let tagName = path.basename(input.toLowerCase(), fileExtension || '')

  if (!tagName.includes('-')) {
    console.error(`Custom element name ${tagName} must include a hyphen!`)
    process.exit(1)
  }

  let className = toPascalCase(tagName)

  return {tagName: tagName, className: className}
}
