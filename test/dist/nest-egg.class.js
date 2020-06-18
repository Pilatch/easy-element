class NestEgg extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `
  <section>
    <p>Some eggs in a nest:</p>
    <bird-egg></bird-egg>
    <bird-egg></bird-egg>
    <bird-egg></bird-egg>
  </section>
<style>:host {
  display: block;
}

:host section {
  background-color: orange;
  display: inline-block;
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

customElements.define('nest-egg', NestEgg);