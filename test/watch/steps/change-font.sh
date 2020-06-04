# Run from the watch folder

newCss=\
'@import "../font-families";
@import "../colors";
@import "../positions";
@import "./ugly-colors";

:host {
    background-color: $ghostly;
    color: $babyblue;
    font-family: $typewriter;
    font-size: $size;
    position: $sta;
}
'

echo "${newCss}" > src/sassy/partials/font-guy.scss
