class ToDo extends HTMLElement {
  connectedCallback() {
    let shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = `<h2>To-do list:</h2>
<ol>
  <li>Smile</li>
  <li>Say thanks</li>
  <li>Be quiet</li>
</ol>
`;
  }

  querySelector(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  querySelectorAll(selector) {
    return this.shadowRoot.querySelectorAll(selector);
  }

}

customElements.define('to-do', ToDo);