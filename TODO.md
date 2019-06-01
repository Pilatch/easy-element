Test for build failure error messages, such as:
  css syntax error
  trying to build a file that does not exist
  building with the wrong preprocessor

Better compiled output without multiple "use strict" and other nonsese.

Error message test for a building a css file without specifying a preprocessor,
and it blows up on syntax error.

Create elements specifically for the nest test and put them in the demos.

Make this error message better:

    ~/dev/easy-element/test (random-improvements-including-build-nested-directory-structure)
    $ node ../cli.js watch src/nest/
    Building src/nest/ to dist
    Building src/nest/ to dist
    Building nest-egg from:
      src/nest/egg/nest-egg.html
      src/nest/egg/nest-egg.sass
    Building nest-egg from:
      src/nest/egg/nest-egg.html
      src/nest/egg/nest-egg.sass
    (node:24664) UnhandledPromiseRejectionWarning: Error: Error: Error: While processing SASS in src/nest/egg/nest-egg.sass, Error: Expected expression.
      ╷
    2 │   background-color:
      │                    ^
      ╵
      stdin 2:20  root stylesheet
        at toss (/Users/ethan/dev/easy-element/lib/fail.js:27:9)
        at fail (/Users/ethan/dev/easy-element/lib/fail.js:3:5)