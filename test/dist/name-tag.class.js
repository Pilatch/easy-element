class NameTag extends HTMLElement {
  connectedCallback() {
    var contents = `
  <h2 class="name-tag_heading">Hello, my name is</h2>
  <div class="name-tag_name-container">
    <slot></slot>
  </div>
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

customElements.define('name-tag', NameTag);