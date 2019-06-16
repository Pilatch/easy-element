;

(function () {
  'use strict';

  if (!window.whateverYouDoDontLoadRedButton) {
    class RedButton extends HTMLElement {
      constructor() {
        super();

        if (!RedButton.firstTimeLoaded) {
          // pretend to do stuff on startup
          RedButton.firstTimeLoaded = true;
        }
      }

      connectedCallback() {
        this.attachShadow({
          mode: 'open'
        });
        this.shadowRoot.innerHTML = `
  <button><slot>Never click this button!</slot></button>
<style>:host button {
  background-color: red;
  border: 0;
  box-shadow: 2px 2px 2px gray;
  color: white;
  font-size: 1.5em;
}

:host(.pushed) button {
  background-color: orange;
  color: black;
  font-weight: bold;
  font-size: 2.5em;
  padding: 1em;
}</style>`;
        this.querySelector('button').addEventListener('click', event => {
          this.classList.add('pushed');
          this.querySelector('slot').textContent = 'BOOM!';
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

    } // Do some stuff outside the class to prove that any JS we write gets injected into the finished product.


    RedButton.firstTimeLoaded = false;
  } else {
    console.error('Refused to load RedButton!');
  }
})();

customElements.define('red-button', RedButton);