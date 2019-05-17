class ConStruct extends HTMLElement {
  constructor() {
    super();
    console.log('I wuz con-structed.'); // Look in the console on the demo page.
    // This shouldn't throw any errors complaining about a lack of super()
  }

  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `<slot></slot>`;
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

customElements.define('con-struct', ConStruct);