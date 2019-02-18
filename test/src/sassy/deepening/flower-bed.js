class FlowerBed {
  connectedCallback() {
    this.querySelectorAll('.petals').forEach(petals => {
      petals.innerHTML = `
        <div class="petal petal1"></div>
        <div class="petal petal2"></div>
        <div class="petal petal3"></div>
        <div class="petal petal4"></div>
        <div class="petal petal5"></div>`
    })
  }
}
