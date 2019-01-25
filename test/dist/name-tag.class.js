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

:host(.dark) {
  background-color: black;
}

.name-tag_name-container {
  background-color: white;
  padding: 1em 0.5em;
  font-size: 3em;
  text-align: center;
}</style>`;
  }

  querySelector(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  querySelectorAll(selector) {
    return this.shadowRoot.querySelectorAll(selector);
  }

}

customElements.define('name-tag', NameTag);