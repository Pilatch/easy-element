# Easy Element

Easily create cross-browser web components (custom elements) from HTML, CSS, and [JavaScript classes](https://developers.google.com/web/fundamentals/web-components/customelements).

![Hello, my name is Easy Element name-tag](https://raw.githubusercontent.com/Pilatch/easy-element/master/readme-images/name-tag-big.png)

## Install

```bash
$ npm install -g easy-element

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
$ easy-element build src
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

## Browser Support

Tested with Chrome, IE 10, Edge, FireFox, and Safari.

## Adding functionality

For components that _do_ stuff, you'll need some JavaScript. Here's a button that changes color when clicked.

![A dark blue button saying it's sad in French.](https://raw.githubusercontent.com/Pilatch/easy-element/master/readme-images/dark-blue-button.png)
![A light blue button saying it's sad in French.](https://raw.githubusercontent.com/Pilatch/easy-element/master/readme-images/light-blue-button.png)

We'll split it up into three files in our `src` folder... because we can.

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
$ easy-element build src
```

## Build

```bash
# Build from one source file, output to dist.
$ easy-element build src/my-element.html

# Build from one source file, output to public.
$ easy-element build --output public src/my-element.html

# Read .html, .css, and .js files from my-element-directory to build.
$ easy-element build my-element-directory

# Watch the src folder and re-build when its contents change.
$ easy-element watch src

# Create demo-page/index.html to show off my-element.
$ easy-element demo --output demo-page src/my-element.html

# Build using postcss as the CSS preprocessor.
$ easy-element build --preprocessor postcss src/my-element.html
```

Files are output to a folder named `dist` by default. You can change this with the `--output` option, or `-o` for short.

For help, use the `--help` option.

### CSS Preprocessing

![postcss-logo](https://raw.githubusercontent.com/Pilatch/easy-element/master/readme-images/postcss-logo.png)
![sass-logo](https://raw.githubusercontent.com/Pilatch/easy-element/master/readme-images/sass-logo.png)

Supported CSS preprocessors include [postcss](https://postcss.org/) and [Sass](https://sass-lang.com/).

You can specify this on the command line with the `--preprocessor` option, or `-p` for short. Supported preprocessors:

 - `scss`
 - `sass`
 - `postcss`.

Example:

```bash
$ easy-element build src --preprocessor sass
```

To use postcss you must also place a `postcss.config.js` file at the base of your project.

If you're building an HTML file you can specify the preprocessor in your style tag.

```html
<style preprocessor="scss">
/* ... */
</style>
```

If your styles live in a file ending in `.scss` or `.sass` then easy-element will figure which preprocesser syntax to use.

### Examples

Take a look at [the repository's test/src folder](https://github.com/Pilatch/easy-element/tree/master/test/src) to see the different elements we built to test Easy Element.

[`<pilatch-card>`](https://github.com/Pilatch/pilatch-card) is an actual _thing_ built with Easy Element.

## Transformations

### ES6

New stuff like `const`, `let`, `class`, and arrow functions are compiled down to ES5.

### :host

Shadow DOM has the concept of the "host" element. We don't support that in ES5-land because polyfills are slow. So when you have CSS selectors that use `:host` ...

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

### Automatic stuff

The JavaScript `class` you define will automatically `extend HTMLElement` so you don't have to.

We'll also do `customElements.define(...)` at the appropriate time.

### Querying

Only query with `this.querySelector` and `this.querySelectorAll`. See the section on limitations for an explanation why.

`this.querySelector` and `this.querySelectorAll` are aliased to `this.shadowRoot.querySelector` and `this.shadowRoot.querySelectorAll` respectively in the class-based output, so you can expect the same results in both old and new browsers.

# Limitations

## Slots

Slots behave differently between the generated ES5 code and the class-based output with Shadow DOM. For instance, [assignedNodes](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/assignedNodes) won't return what you want in ES5-land. If you want full slot support, look elsewhere.

## Shadow DOM

No attempt is made to polyfill shadow DOM for old browsers. The ES5 output will add your template's contents to the element's inner HTML, and your styles will be appended to `document.head`. So encapsulate your styles by starting your selectors with your element's tag-name or `:host` or use something like [BEM](http://getbem.com/).

The class-based output will use shadow DOM.

Do _not_ rely on `this.shadowRoot` in your JavaScript class, as that will not work in the ES5 output. To manipulate the innards of your web component and retain feature parity, limit yourself to use of `this.querySelector` and `this.querySelectorAll` to get references to elements. Anything else (such as `this.innerHTML` or `this.lastElementChild` or `this.childNodes` or `this.shadowRoot` etc.) would _not_ return the same answers between the ES5 and class-based implementations.

## Extending

Extending things other than `HTMLElement` hasn't really been tested yet. Assume it's McBusted.

# Intent

The goal of Easy Element is to allow creation of custom elements without worry about browser support while leveraging technologies web developers are already familiar with.

For example, if web developers want to handle events within a custom element, they can do so using native JavaScript like `addEventListener`. Compare this to a library like [stencil](https://stenciljs.com/docs/events) where the developer is expected to import event-related decorators and learn to use a proprietary interface.

Easy Element is intended for simple custom elements. If you want something more complex, there are [more feature-complete libraries](https://www.webcomponents.org/introduction#libraries-for-building-web-components) out there.

Or you can use Easy Element as a starting point to build your custom element, then use the generated JavaScript in the `.class.js` file with other tools, as it is V1 spec compliant.
