class BlueButton extends HTMLElement {
  connectedCallback() {
    var contents = `<button><slot>Push this button!</slot></button>
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

    this.querySelector('button').addEventListener('click', event => {
      this.classList.toggle('light');
    });
  }

}

customElements.define('blue-button', BlueButton);