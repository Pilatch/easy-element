class InnerLogger extends HTMLElement {
  constructor() {
    super();
    console.log(this.innerHTML);
  }

  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `<slot></slot>`;
    Object.assign(this.style, {
      fontFamily: `"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace`,
      color: 'green',
      fontSize: '2em',
      fontWeight: 'bold'
    });
    this.addEventListener('click', event => {
      console.log('click event!', event);
    });
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

customElements.define('inner-logger', InnerLogger);