let babel = require('@babel/core')
let parser = require('node-html-parser')
let fs = require('fs')
let elementHtml = fs.readFileSync('./src/search-bar.html') // TODO make dynamic
let document = parser.parse(`<html>${elementHtml}</html>`, {
  lowerCaseTagName: true,
  script: true,
  style: true,
  pre: true
})
let style = document.querySelector('style')
let script = document.querySelector('script')
let template = document.querySelector('template')

if (style && style.rawText) {
  fs.writeFileSync('./dist/search-bar.css', style.rawText)
}

if (script && script.rawText) {
  let ast = babel.parseSync(script.rawText)
  let expectedCustomElementClass = 'SearchBar' // TODO make dynamic based on file name
  let classes = ast.program.body.filter(
    bodyObject => bodyObject.type === 'ClassDeclaration' && bodyObject.id.name == expectedCustomElementClass
  )

  if (classes.length > 1) {
    console.error('No fair. I can\'t handle more than one class for your custom element.')
    process.exit(1)
  }

  let connectedCallbacks = classes[0].body.body.filter(
    bodyObject => bodyObject.type === 'ClassMethod' && bodyObject.key.name === 'connectedCallback'
  )

  if (connectedCallbacks.length > 1) {
    console.error('Duh, I don\'t know what to do with more than one connectedCallback for your custom element class.')
    process.exit(1)
  }

  connectedCallbacks[0].body.body.unshift({
    "type": "ExpressionStatement",
    "start": 68,
    "end": 245,
    "loc": {
      "start": {
        "line": 4,
        "column": 4
      },
      "end": {
        "line": 4,
        "column": 181
      }
    },
    "expression": {
      "type": "AssignmentExpression",
      "start": 68,
      "end": 245,
      "loc": {
        "start": {
          "line": 4,
          "column": 4
        },
        "end": {
          "line": 4,
          "column": 181
        }
      },
      "operator": "=",
      "left": {
        "type": "MemberExpression",
        "start": 68,
        "end": 82,
        "loc": {
          "start": {
            "line": 4,
            "column": 4
          },
          "end": {
            "line": 4,
            "column": 18
          }
        },
        "object": {
          "type": "ThisExpression",
          "start": 68,
          "end": 72,
          "loc": {
            "start": {
              "line": 4,
              "column": 4
            },
            "end": {
              "line": 4,
              "column": 8
            }
          }
        },
        "property": {
          "type": "Identifier",
          "start": 73,
          "end": 82,
          "loc": {
            "start": {
              "line": 4,
              "column": 9
            },
            "end": {
              "line": 4,
              "column": 18
            },
            "identifierName": "innerHTML"
          },
          "name": "innerHTML"
        },
        "computed": false
      },
      "right": {
        "type": "TemplateLiteral",
        "start": 85,
        "end": 245,
        "loc": {
          "start": {
            "line": 4,
            "column": 21
          },
          "end": {
            "line": 4,
            "column": 181
          }
        },
        "expressions": [],
        "quasis": [
          {
            "type": "TemplateElement",
            "start": 86,
            "end": 244,
            "loc": {
              "start": {
                "line": 4,
                "column": 22
              },
              "end": {
                "line": 4,
                "column": 180
              }
            },
            "value": {
              "raw": template.innerHTML,
              "cooked": template.innerHTML.replace(/`/g, '\\`')
            },
            "tail": true
          }
        ]
      }
    }
  })

  let classResult = babel.transformFromAstSync(ast)

  if (classResult.code) {
    fs.writeFileSync('./dist/search-bar.class.js', classResult.code) // TODO make dynamic
  }

  let es5Result = babel.transformFromAstSync(ast, null, {configFile: './.babelrc'})

  if (es5Result.code) {
    fs.writeFileSync('./dist/search-bar.es5.js', es5Result.code) // TODO make dynamic
  }

  // TODO handle there being no connectedCallback, but a template

  // TODO if there is no superclass, make it HTMLElement (probably without the start and end tho)
  // superClass:
  //  Node {
  //    type: 'Identifier',
  //    start: 25,
  //    end: 36,
  //    loc: [SourceLocation],
  //    name: 'HTMLElement' },
}