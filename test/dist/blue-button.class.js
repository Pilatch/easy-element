class BlueButton extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `<button><slot>Push this button!</slot></button>
<style>:host button {
  background-color: blue;
  border: 0;
  box-shadow: 2px 2px 2px gray;
  color: white;
  font-size: 1.5em;
}

:host(.light) button {
  background-color: lightblue;
  color: black;
}</style>`;
    this.querySelector('button').addEventListener('click', event => {
      this.classList.toggle('light');
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

  dispatchEvent(event) {
    return this.shadowRoot.dispatchEvent(event);
  }

}

customElements.define('blue-button', BlueButton);