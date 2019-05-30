Test for build failure error messages, such as:
  css syntax error
  trying to build a file that does not exist
  building with the wrong preprocessor

Better compiled output without multiple "use strict" and other nonsese.

Build nested file structure to match what watch.js does. See TODO in there.
  Then delete the limitation warning in the README.

Error message test for a building a css file without specifying a preprocessor,
and it blows up on syntax error.

Don't try to build .scss and .sass files that are prefixed with an underscore.

Ignore any file beginning with an underscore.

Create elements specifically for the nest test and put them in the demos.

Build in deterministic order. Right now it outputs js in a random order.
