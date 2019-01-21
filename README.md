# Easy Element

Easily create web components (custom elements) from HTML, CSS and JavaScript.

![Hello, my name is Easy Element name-tag](readme-images/name-tag.png)

For a purely visual element like this name-tag you can create one HTML file with `template` and `style` tags at `src/name-tag.html`.

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

Then on your command line, you can build the JavaScript for this custom element.

```bash
easy-element src/name-tag.html
```

It will create two JavaScript files: `dist/name-tag.es5.js` and `dist/name-tag.class.js` for both old and new browsers.

## Install

```bash
npm install -g easy-element
```

## Run

```bash
easy-element build src/my-element.html
easy-element build --output public src/my-element.html
easy-element build my-element-directory
easy-element watch src
easy-element demo --output demo-page src/my-element.html
```

Files are output to a folder named `dist` by default.

## Browser Support

Tested with Chrome, IE 10, Edge, FireFox, and Safari.

# Limitations

Easy Element is intended for simple custom elements. Nothing fancy. If you want something more complex, there are [more feature-complete libraries](https://www.webcomponents.org/introduction#libraries-for-building-web-components) out there.

## Slots

Only one non-named `<slot>` element is supported on the ES5-side at this point. It may be enhanced to support named slots in the future.

## Shadow DOM

No attempt is made to polyfill shadow DOM for old browsers. The ES5 output will add your template's contents to the element's inner HTML, and your styles will be appended to `document.head`. So encapsulate your styles by starting your selectors with your element's tag-name or `:host` or use something like [BEM](http://getbem.com/).

The class-based output will use shadow DOM.

### Querying

`this.querySelector` and `this.querySelectorAll` are transformed into `this.shadowRoot.querySelector` and `this.shadowRoot.querySelectorAll` respectively in the class-based output.