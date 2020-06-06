# Run from the watch folder

newCss=\
'@import "pretend-sass-thingy/stupid-vars";

:host {
    font-size: $onePointFiveEm;
}
'

echo "${newCss}" > src/sassy/partials/one-point-five.scss
