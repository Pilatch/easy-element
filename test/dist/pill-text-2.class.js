class PillText2 extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `<slot></slot><style>:host {
  background-color: #80ff80;
  border-radius: 1em;
  padding-left: 0.5em;
}

:host::after {
  background-color: #ffd076;
  content: "!";
  display: inline-block;
  width: 1.5em;
  text-align: center;
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

customElements.define('pill-text-2', PillText2);