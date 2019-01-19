class BlueButton extends HTMLElement {
  connectedCallback() {
    let shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = `<button><slot>Push this button!</slot></button>
<style>:host button {
  background-color: blue;
  border: 0;
  box-shadow: 2px 2px 2px gray;
  color: white;
  font-size: 1.5em;
}

:host.light button {
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

}

customElements.define('blue-button', BlueButton);