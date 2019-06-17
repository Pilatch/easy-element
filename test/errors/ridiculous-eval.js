eval(`class RidiculousEval extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = \`<slot></slot><style>:host {
  background-color: blue;
  color: white;
  display: inline-block;
  font-family: monospace;
}</style>\`;
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

}

customElements.define('ridiculous-eval', RidiculousEval);`)
