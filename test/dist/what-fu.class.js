class WhatFu extends HTMLElement {
  connectedCallback() {
    var contents = `
  <p>I know <slot>kung</slot>-fu!</p>
`;

    if (this.childNodes.length) {
      var template = document.createElement('div');
      template.innerHTML = contents;
      var slot = template.querySelector('slot');

      while (slot.childNodes.length) {
        slot.removeChild(slot.lastChild);
      }

      while (this.childNodes.length) {
        slot.appendChild(this.firstChild);
      }

      this.innerHTML = template.innerHTML;
    } else {
      this.innerHTML = contents;
    }
  }

}

customElements.define('what-fu', WhatFu);