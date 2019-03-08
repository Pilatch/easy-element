rm dist/*

node ../cli.js build src/one-html-file-three-tags/search-bar.html
node ../cli.js build src/only-css/simple-bling.css
node ../cli.js build src/only-js/inner-logger.js
node ../cli.js build src/with-slot/name-tag.html
node ../cli.js build src/multi-slot/login-form.html
node ../cli.js build src/add-more-js/what-fu.html
node ../cli.js build src/dir-with-three
node ../cli.js build src/dir-with-one
node ../cli.js build src/blank-script/ah-choo.html
node ../cli.js build src/only-html/to-do.html
node ../cli.js build src/escape-backwhack
node ../cli.js build src/with-love
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
node ../cli.js build src/sassy/deepdoodle/pill-text-2.sass
node ../cli.js build src/sassy/deepinhammer
node ../cli.js build src/sassy/deeplink/minish-link.html --preprocessor sass
