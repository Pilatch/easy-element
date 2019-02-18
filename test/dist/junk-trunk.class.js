class JunkTrunk extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `
  <p>Your Junk: <slot></slot></p>
<style>:host {
  background-color: #c89696;
  color: #e8e8e8;
  display: inline-block;
  font-family: sans-serif;
}

:host p {
  padding: 0 0.25em;
}</style>`;
  }

  querySelector(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  querySelectorAll(selector) {
    return this.shadowRoot.querySelectorAll(selector);
  }

}

customElements.define('junk-trunk', JunkTrunk);