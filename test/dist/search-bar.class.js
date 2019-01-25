class SearchBar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `
  <form class="search-bar_form">
    <input class="search-bar_input" placeholder="Search" />
    <button class="search-bar_button" type="submit">Submit to THanos!</button>
  </form>
<style>.search-bar_form {
  position: relative;
  overflow-x: hidden;
}

.search-bar_input,
.search-bar_button {
  font-family: 'Open Sans', sans-serif;
}

.search-bar_form,
.search-bar_input,
.search-bar_button {
  border: 0;
  box-sizing: border-box;
  height: 6rem;
  outline: 0;
}

.search-bar_input {
  float: left;
  font-size: 1.4rem;
  margin: 0;
  padding: 0;
  padding-left: 1rem;
  width: calc(100% - 11rem);
  transition: all .3s ease;
}

.search-bar_input::-ms-clear {
  display: none;
}

.search-bar_input:focus,
.search-bar_button:focus,
.search-bar_button::-moz-focus-inner {
  border: 0;
  outline: none;
}

.search-bar_button {
  color: #ffffff;
  background-color: chocolate;
  font-size: 1.8rem;
  font-weight: 100;
  transition: all .25s ease;
  width: 11rem;
}

.search-bar_button:hover {
  background-color: sienna;
}

.search-bar_button:focus {
  background-color: sienna;
}</style>`;
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

  querySelector(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  querySelectorAll(selector) {
    return this.shadowRoot.querySelectorAll(selector);
  }

}

customElements.define('search-bar', SearchBar);