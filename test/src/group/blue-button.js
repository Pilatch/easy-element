class BlueButton extends HTMLElement {
  connectedCallback() {
    this.querySelector('button')
      .addEventListener('click', event => {
        this.classList.toggle('light')
      })
  }
}
