class BlueButton extends HTMLButtonElement {
  connectedCallback() {
    this.querySelector('button')
      .addEventListener('click', event => {
        this.classList.toggle('light')
      })
  }
}
