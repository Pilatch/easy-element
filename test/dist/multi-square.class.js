class MultiSquare extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `
  <blue-square></blue-square>
  <red-square></red-square>
<style>:host {
  display: inline-block;
  width: 45px;
  height: 30px;
  position: relative;
}

:host blue-square,
:host red-square {
  position: absolute;
  left: 0;
  top: 0;
}

:host blue-square {
  left: 15px;
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

customElements.define('multi-square', MultiSquare);