class BirdEgg extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `<slot></slot><style>:host {
  display: inline-block;
  background-color: white;
  border-radius: 20px;
  width: 20px;
  height: 20px;
}</style>`;
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

customElements.define('bird-egg', BirdEgg);