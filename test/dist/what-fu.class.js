class WhatFu extends HTMLElement {
  connectedCallback() {
    let shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = `
  <p>I know <slot>kung</slot>-fu!</p>
`;
  }

}

customElements.define('what-fu', WhatFu);