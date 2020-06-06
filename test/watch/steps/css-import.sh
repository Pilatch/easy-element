# Run from the watch folder

# Change --my-red from 244 to 251

newCss=\
':root {
  --my-red: rgb(251, 9, 17);
  --my-blue: rgb(12, 7, 231);
}
'

echo "${newCss}" > src/sassy/hues.css
