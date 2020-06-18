class NameTag extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `
  <h2 class="name-tag_heading">Hello, my name is</h2>
  <div class="name-tag_name-container">
    <slot></slot>
  </div>
<style>:host {
  display: inline-block;
  width: 400px;
}

.name-tag_heading {
  background-color: red;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  color: white;
  padding: 0.5em;
  margin: 0;
}

:host(.dark) {
  background-color: black;
}

.name-tag_name-container {
  background-color: white;
  border: 1px solid red;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 1em 0.5em;
  font-size: 3em;
  text-align: center;
}</style>`;
    var slot = 'I should not cause a namespace collision!';
  }

  querySelector(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  querySelectorAll(selector) {
    return this.shadowRoot.querySelectorAll(selector);
  }

  addEventListener() {
    return this.shadowRoot.addEventListener.apply(this.shadowRoot, arguments);
  }

  dispatchEvent(event) {
    return this.shadowRoot.dispatchEvent(event);
  }

}

customElements.define('name-tag', NameTag);