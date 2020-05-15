let path = require('path')
let importsToWatch = require('../../lib/imports-to-watch')
let srcDir = path.resolve('../src')
let nodeModulesDir = path.resolve('../node_modules')
let assert = require('assert')

describe('sass imports to watch', () => {
  describe('_singleImportMap', () => {
    it('produces an import map for a given file', () => {
      let inputFile = `${srcDir}/sassy/watch-partial-changed/font-guy.scss`
      let importMap = importsToWatch._singleImportMap(inputFile)

      assert.deepEqual(importMap, {
        [inputFile]: [
          `${srcDir}/sassy/_font-families.scss`,
          `${nodeModulesDir}/pretend-sass-thingy/_stupid-vars.scss`,
          `${srcDir}/sassy/_colors.scss`,
        ]
      })
    })

    it('produces a blank map for a file with no imports', () => {
      let inputFile = `${srcDir}/sassy/_colors.scss`
      let importMap = importsToWatch._singleImportMap(inputFile)

      assert.deepEqual(importMap, {})
    })

    it('produces a blank map for a file it cannot find', () => {
      assert.deepEqual(
        importsToWatch._singleImportMap(
          `${srcDir}/file/path/that/will/never/exist-evil-squid-named-grover-003300.scss`
        ),
        {}
      )
    })
  })

  describe('_invertImportMap', () => {
    it('makes a depth-one map of child files to oldest ancestor', () => {
      let inputFile = `${srcDir}/sassy/watch-partial-changed/font-guy.scss`
      let inverted = importsToWatch._invertImportMap({
        [inputFile]: [
          `${srcDir}/sassy/_font-families.scss`,
          `${nodeModulesDir}/pretend-sass-thingy/_stupid-vars.scss`,
          `${srcDir}/sassy/_colors.scss`,
        ],
        'sunnyDay': ['clear', 'skies']
      })

      assert.deepEqual(inverted, {
        [`${srcDir}/sassy/_colors.scss`]: inputFile,
        [`${nodeModulesDir}/pretend-sass-thingy/_stupid-vars.scss`]: inputFile,
        [`${srcDir}/sassy/_font-families.scss`]: inputFile,
        clear: 'sunnyDay',
        skies: 'sunnyDay',
      })
    })

    it('turns a blank object into anther blank object', () => {
      assert.deepEqual(importsToWatch._invertImportMap({}), {})
    })
  })

  describe('importsToWatch', () => {
     it('effectively is _singleImportMap >> _invertImportMap when dealing with one file', async () => {
       let inputFile = `${srcDir}/sassy/watch-partial-changed/font-guy.scss`
       let importMap = await importsToWatch(inputFile)

       assert.deepEqual(importMap, {
         [`${srcDir}/sassy/_colors.scss`]: inputFile,
         [`${nodeModulesDir}/pretend-sass-thingy/_stupid-vars.scss`]: inputFile,
         [`${srcDir}/sassy/_font-families.scss`]: inputFile,
       })
     })

    it('makes a bigger map when dealing with directory', async () => {
      let inputDirectory = `${srcDir}/group`
      let importMap = await importsToWatch(inputDirectory, true)

      assert.deepEqual(importMap, {
        [`${srcDir}/sassy/_colors.scss`]: `${srcDir}/group/pill-text-2.sass`,
        [`${nodeModulesDir}/pretend-sass-thingy/_stupid-vars.scss`]: `${srcDir}/group/pill-text-2.sass`,
      })
    })
  })
})
