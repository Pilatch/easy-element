class AhChoo extends HTMLElement {
  connectedCallback() {
    let shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = `
  <p>Whenever I sneeze, I also <slot>cough</slot>.</p>
`;
  }

}

customElements.define('ah-choo', AhChoo);