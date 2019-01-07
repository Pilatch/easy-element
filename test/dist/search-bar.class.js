class SearchBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
  <form class="search-bar_form">
    <input class="search-bar_input" placeholder="Search" />
    <button class="search-bar_button" type="submit">Submit to THanos!</button>
  </form>
`;
    this.input = this.querySelector('input');
    this.querySelector('form').addEventListener('submit', this.dispatchTerm.bind(this, 'submit'));
    this.input.addEventListener('keyup', this.dispatchTerm.bind(this, 'input'));
    var placeholder = this.getAttribute('placeholder');
    var value = this.getAttribute('value');

    if (placeholder) {
      this.input.setAttribute('placeholder', placeholder);
    }

    if (typeof value === 'string') {
      this.input.value = value;
    }
  }

  dispatchTerm(eventSuffix, event) {
    event.preventDefault();
    event = new CustomEvent('search-bar-' + eventSuffix, {
      bubbles: true,
      composed: true,
      detail: {
        term: this.input.value
      }
    });
    this.dispatchEvent(event);
  }

  get value() {
    return this.input.value;
  }

  set value(newValue) {
    this.input.value = newValue;
  }

}

window.addEventListener('WebComponentsReady', function () {
  customElements.define('search-bar', SearchBar);
});