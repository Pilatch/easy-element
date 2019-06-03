class HyperLink extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `
  <a><slot></slot></a>
<style>:host a {
  color: green;
  font-style: italic;
}</style>`;
    let anchor = this.querySelector('a');
    ['href', 'tabindex', 'target'].forEach(attribute => {
      anchor.setAttribute(attribute, this.getAttribute(attribute));
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

customElements.define('hyper-link', HyperLink);