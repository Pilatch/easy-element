class IPad extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `
  <div class="i-pad_inner"></div>
<style>:host {
  background-color: white;
  border: 1px solid gray;
  border-radius: 10px;
  display: inline-block;
  height: 150px;
  padding: 10px;
  width: 200px;
}

:host .i-pad_inner {
  display: inline-block;
  background-color: black;
  height: 150px;
  width: 100%;
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

customElements.define('i-pad', IPad);