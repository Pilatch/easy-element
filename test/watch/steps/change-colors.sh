# Run from the watch folder

# Changing both mintgreen and babyblue 255->233
# mintgreen is used in typo-negative (:host p color)
# babyblue is used in font-guy (:host color)

newCss=\
'$babyblue: rgb(128, 128, 233);
$rosypink: rgb(255, 128, 128);
$mintgreen: rgb(128, 233, 128);
$orangecream: rgb(255, 208, 118);
$brown: rgb(200, 150, 150);
$eggshell: rgb(232, 232, 232);

// flower-bed stuff
$skyBlue: #d6fdff;
$magenta: #a817aa;
$purple: #9245ba;
$blue: #40afbf;
$green: #21b74b;
'

echo "${newCss}" > src/sassy/_colors.scss
