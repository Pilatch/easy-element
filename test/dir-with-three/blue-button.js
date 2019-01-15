class BlueButton extends HTMLElement {
  connectedCallback() {
    this.querySelector('button')
      .addEventListener('click', event => {
        this.classList.toggle('light')
      })
  }
}

window.addEventListener('WebComponentsReady', function () {
  customElements.define('blue-button', BlueButton)
})
