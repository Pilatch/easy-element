class PseudoBlocks extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `<slot></slot><style>:host {
  display: inline-block;
  background-color: rgb(8, 223, 16);
  height: 100px;
  position: relative;
  width: 100px;
}

:host::after {
  background-color: rgb(255, 239, 16);
  content: '';
  height: 25px;
  left: 25px;
  position: absolute;
  top: 25px;
  width: 25px;
}

:host::before {
  background-color: rgb(255, 239, 16);
  content: '';
  height: 25px;
  left: 50px;
  position: absolute;
  top: 50px;
  width: 25px;
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

}

customElements.define('pseudo-blocks', PseudoBlocks);