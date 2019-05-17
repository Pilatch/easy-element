# Easy Element

Lets web developers leverage technologies they are already familiar with to create cross-browser web components (custom elements) from HTML, CSS, and [JavaScript classes](https://developers.google.com/web/fundamentals/web-components/customelements).

![Hello, my name is Easy Element name-tag](https://raw.githubusercontent.com/Pilatch/easy-element/master/readme-images/name-tag-logo.png)

## Install

```bash
$ npm install --save-dev easy-element

# Or to create a new web component project with Yeoman:
$ npm install -g yo generator-easy-element
$ yo easy-element
```

## Usage

For a purely visual element, like our `<name-tag>` logo at the top, you can create one HTML file with only a `template` and a `style`.

```html
<!-- src/name-tag.html -->
<template>
  <h2 class="name-tag_heading">Hello, my name is</h2>
  <div class="name-tag_name-container">
    <slot></slot>
  </div>
</template>
<style>
  name-tag {
    border: 1px solid red;
    display: inline-block;
    width: 400px;
  }
  .name-tag_heading {
    background-color: red;
    color: white;
    padding: 0.5em;
    margin: 0;
  }
  .name-tag_name-container {
    background-color: white;
    padding: 1em 0.5em;
    font-size: 3em;
    text-align: center;
  }
</style>
```

Then on your command line, you can build the custom element for use in browsers.

```bash
$ npx easy-element build src/name-tag.html
```

It will create two JavaScript files: `dist/name-tag.es5.js` and `dist/name-tag.class.js` for old and new browsers respectively.

### New browsers

If you only support new browsers, congratulations! Just add the element's class-based script to your HTML.

```html
<srcipt src="/dist/name-tag.class.js"></script>
```

### Most browsers

For a wider range of browser support install `@webcomponents/webcomponentsjs` polyfills to use `<name-tag>`.

```bash
$ npm install --save '@webcomponents/webcomponentsjs'
```

Then include these scripts in your HTML.

```html
<script src="/node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>
<script src="/node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
<srcipt src="/dist/name-tag.es5.js"></script>
```

#### Browser Support

Tested with Chrome, IE 10, Edge, FireFox, and Safari.

## Adding functionality

For components that _do_ stuff, you'll need some JavaScript. Here's a button that changes color when clicked.

![A dark blue button saying it's sad in French.](https://raw.githubusercontent.com/Pilatch/easy-element/master/readme-images/dark-blue-button.png)
![A light blue button saying it's sad in French.](https://raw.githubusercontent.com/Pilatch/easy-element/master/readme-images/light-blue-button.png)

We'll split it between three files in our `src` folder, because we can.

```html
<!-- src/blue-button.html -->
<button><slot>Push this button!</slot></button>
```

```css
/* src/blue-button.css */
blue-button button {
  background-color: blue;
  border: 0;
  box-shadow: 2px 2px 2px gray;
  color: white;
  font-size: 1.5em;
}
blue-button.light button {
  background-color: lightblue;
  color: black;
}
```

```js
// src/blue-button.js
class BlueButton {
  connectedCallback() {
    this.querySelector('button').addEventListener('click', event => {
      this.classList.toggle('light')
    })
  }
}
```

Then it's built by running

```bash
$ npx easy-element build src
```

## Commands

### `build`

```bash
# Build from one source file, output to dist
$ npx easy-element build src/my-element.html

# Build from one source file, output to public
$ npx easy-element build src/my-element.html --output public

# Build from .html, .css, and .js files in my-element-directory
$ npx easy-element build my-element-directory

# Build all the .html, .css, and .js files in src into bundles
$ npx easy-element build src --bundle
```

### `watch`

Make sure you have [NodeJS version 10 or later](https://nodejs.org/fr/blog/release/v10.0.0/), otherwise the watcher may quit unexpectedly.

```bash
# Watch the src folder and re-build to dist when its contents change
$ npx easy-element watch src

# Watch the src folder and re-build to public when its contents change
$ npx easy-element watch src --output public

# Watch the src folder and build bundles when its contents change
$ npx easy-element watch src --bundle
```

### `demo`

Make demo pages for your custom elements. Will create one for old browsers, and one for new. If you specify the output folder to be somewhere other than where your custom elements' built files live, you'll probably have to edit the script paths in your demo page.

```bash
# Create dist/index.html to show off <my-element>
$ npx easy-element demo src/my-element.html

# Create public/index.html to show off <my-element>
$ npx easy-element demo --output public src/my-element.html

# Create dist/index.html to show off all the elements you're building from src as a bundle
$ npx easy-element demo src --bundle
```

## Options

### `--help`

Show the help text and quit.

### `--output` or `-o`

Change folder that your generated `.es5.js` and `.class.js` files are written to. Files are output to a folder named `dist` by default.

```bash
# Output to a folder named exports
$ npx build src --output exports
```

### `--bundle` or `-b`

Bundle all the elements you're building together. Normally when you build a directory with a command such as `npx easy-element build src` it will output a pair of files (`.class.js` and `.es5.js`) for each element it builds. With the `--bundle` flag, it will instead produce only one pair of files for the whole group: `bundle.class.js` and `bundle.es5.js`. This is especially useful if you're curating a library of custom elements instead of making individual repositories for each.

### `--minify` or `-m`

Squish your output code down to one line.

### `--preprocessor` or `-p`

Specify which CSS preprocessor to use. Valid options are:

 - `scss`
 - `sass`
 - `postcss`

```bash
# Build from the src folder with SASS syntax
$ npx easy-element build src --preprocessor sass
```

[Learn more about that below.](#css-preprocessing)

## CSS Preprocessing

![postcss-logo](https://raw.githubusercontent.com/Pilatch/easy-element/master/readme-images/postcss-logo.png)
![sass-logo](https://raw.githubusercontent.com/Pilatch/easy-element/master/readme-images/sass-logo.png)

Supported CSS preprocessors are [postcss](https://postcss.org/) and [Sass](https://sass-lang.com/).

To use postcss you must also place a `postcss.config.js` file at the base of your project.

If you're building an HTML file you can specify the preprocessor in your style tag.

```html
<style preprocessor="scss">
/* ... */
</style>
```

If your styles live in a file ending in `.scss` or `.sass` then easy-element will figure out which preprocesser syntax to use.

## Example Elements

Take a look at [the repository's test/src folder](https://github.com/Pilatch/easy-element/tree/master/test/src) to see the different elements we built to test Easy Element.

[`<pilatch-card>`](https://github.com/Pilatch/pilatch-card) is an actual _thing_ built with Easy Element, and the reason this tool exists.

## Transformations

### ES6

New stuff like `const`, `let`, `class`, and arrow functions are compiled down to ES5.

### :host

Shadow DOM has the concept of the [host element](https://developer.mozilla.org/en-US/docs/Web/CSS/:host()). We don't support that in ES5-land because polyfills are slow. So when you have CSS selectors that use `:host` ...

```css
/* my-element.css */
:host { ... }
:host(.enabled) { ... }
```

...they are converted to the following for the `.es5.js` output file.

```css
my-element { ... }
my-element.enabled { ... }
```

The reverse is true for the `.class.js` output file where Shadow DOM is a real thing. CSS selectors containing your custom element's name are transformed to use `:host` and `:host(...)` as necessary.

### Boilerplate

The JavaScript `class` you define will automatically `extend HTMLElement` so you don't have to.

We'll also do `customElements.define(...)` at the appropriate time.

### Querying

Only query with `this.querySelector` and `this.querySelectorAll`. See the section on limitations for an explanation why.

`this.querySelector` and `this.querySelectorAll` are aliased to `this.shadowRoot.querySelector` and `this.shadowRoot.querySelectorAll` respectively in the class-based output, so you can expect the same results in both old and new browsers.

### Events

You can use `this.addEventListener` and expect feature parity in old and new browsers. It'll be aliased to `this.shadowRoot.addEventListener` in the class-based output.

## Limitations

### Slots

Slots behave differently between the generated ES5 code and the class-based output with Shadow DOM. For instance, [assignedNodes](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/assignedNodes) won't return what you want in ES5-land. If you want full slot support, look elsewhere.

### Shadow DOM

No attempt is made to polyfill shadow DOM for old browsers. The ES5 output will add your `<template>`'s contents to the element's inner HTML, and your styles will be appended to `document.head`. So encapsulate your styles by starting your selectors with your element's tag-name or `:host` or use something like [BEM](http://getbem.com/).

The class-based output will use shadow DOM.

Do _not_ rely on `this.shadowRoot` in your JavaScript class, as that will not work in the ES5 output. To manipulate the innards of your web component and retain feature parity, limit yourself to use of `this.querySelector` and `this.querySelectorAll` to get references to elements. Anything else (such as `this.innerHTML` or `this.lastElementChild` or `this.childNodes` or `this.shadowRoot` etc.) would _not_ return the same answers between the ES5 and class-based implementations.

Easy Element has no way of knowing whether your CSS selector was intended to style the element itself or one of its child elements. This can be an issue when stlying shadow DOM because all the styles get dumped into the shadow root. That means if you have an element that renders like this:

```html
<vehicle-picker class="electric">
  <an-option>car</an-option>
  <an-option>motorcycle</an-option>
</vehicle-picker>
```

Then your styles that include a rule of `.electric { ... }` would not style the host element in the class-based output, but a rule like `:host(.electric) { ... }` would have the desired effect. In the ES5 output, your custom element would probably be rendered as you intended either way.

### Extending

Extending things other than `HTMLElement` hasn't really been tested yet. Assume it's McBusted.

### Directory structure

Building multi-level directory trees is not supported. Easy Element won't do recursive directory traversal to search for your source code. So put your element code in one flat folder.

## Distinctions

What makes Easy Element different from other options?

Well, if web developers want to handle events within a custom element, Easy ELement lets them do so using native JavaScript like `addEventListener`. Compare this to a library like [stencil](https://stenciljs.com/docs/events) where the developer is expected to import event-related decorators and learn to use a proprietary interface.

Easy Element is intended for simple custom elements. If you want something more complex, there are [more feature-complete libraries](https://www.webcomponents.org/introduction#libraries-for-building-web-components) out there.

Or you can use Easy Element as a starting point to build your custom element, then use the generated JavaScript in the `.class.js` file with other tools, as it is [V1 spec](https://www.webcomponents.org/specs) compliant.
