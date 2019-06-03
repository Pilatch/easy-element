rm dist/*

node ../cli.js build src/nest
node ../cli.js build src/group

node ../cli.js build src/one-html-file-three-tags/search-bar.html
node ../cli.js build src/only-css/simple-bling.css
node ../cli.js build src/only-js/inner-logger.js
node ../cli.js build src/add-more-js/what-fu.html
node ../cli.js build src/dir-with-one
node ../cli.js build src/extends-anchor
node ../cli.js build src/only-html/to-do.html
node ../cli.js build src/watch-me
node ../cli.js build src/post-css --preprocessor postcss
node ../cli.js build src/post-only-css/pseudo-blocks.css -p postcss
node ../cli.js build src/post-css-in-html/checker-blocks.html
node ../cli.js build src/post-css-import/deeper -p postcss
node ../cli.js build src/sassy/deepening
# Build both ways to test each method doesn't blow up
node ../cli.js build src/sassy/deepness/pill-text.scss
node ../cli.js build src/sassy/deepness
node ../cli.js build src/sassy/deeply
node ../cli.js build src/sassy/deeply/junk-trunk.html
node ../cli.js build src/sassy/deepinhammer
node ../cli.js build src/sassy/deeplink/minish-link.html --preprocessor sass

node ../cli.js build --bundle src/group

# Error message testing.
# Diffs expected vs actual.
node ../cli.js build errors/scss-only-syntax-error.scss 2>&1 | diff -u - errors/scss-only-syntax-error.txt
node ../cli.js build errors/scss-only-syntax-error.scss -p postcss 2>&1 | diff -u - errors/wrong-preprocessor.txt
node ../cli.js build errors/beerflap-does-not-exist 2>&1 | diff -u - errors/building-a-file-that-does-not-exist.txt
node ../cli.js build 2>&1 | grep 'Please specify an input' | diff -u - errors/no-input.txt
node ../cli.js build errors/empty-dir 2>&1 | diff -u - errors/empty-dir.txt
node ../cli.js build -p scss errors/preprocessor-conflict.html 2>&1 | diff -u - errors/preprocessor-conflict.txt
node ../cli.js build errors/extra-css 2>&1 | diff -u - errors/extra-css.txt
node ../cli.js build errors/extra-js 2>&1 | diff -u - errors/extra-js.txt
node ../cli.js build errors/extra-sass -p scss 2>&1 | diff -u - errors/inferred-preprocessor-conflict.txt
