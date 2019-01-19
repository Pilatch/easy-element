class NameTag extends HTMLElement {
  connectedCallback() {
    let shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = `
  <h2 class="name-tag_heading">Hello, my name is</h2>
  <div class="name-tag_name-container">
    <slot></slot>
  </div>
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
</style>`;
  }

  querySelector(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  querySelectorAll(selector) {
    return this.shadowRoot.querySelectorAll(selector);
  }

}

customElements.define('name-tag', NameTag);