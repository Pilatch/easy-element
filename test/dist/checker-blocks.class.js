class CheckerBlocks extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `
  <div class="checker-blocks-row">
    <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
  </div>
  <div class="checker-blocks-row">
    <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
  </div>
  <div class="checker-blocks-row">
    <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
  </div>
  <div class="checker-blocks-row">
    <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
  </div>
  <div class="checker-blocks-row">
    <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
  </div>
  <div class="checker-blocks-row">
    <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
  </div>
  <div class="checker-blocks-row">
    <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
  </div>
  <div class="checker-blocks-row">
    <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
  </div>
<style>:host {
  display: flex;
  height: 400px;
  width: 400px;
}

.checker-blocks-row {
  height: calc(400px / 8);
  width: 400px;
}

.checker-blocks-row i {
  display: flex;
  height: 50px;
  width: 50px;
}

.checker-blocks-row:nth-child(2n+1) i:nth-child(2n) {
  background-color: rgb(16, 16, 16);
}

.checker-blocks-row:nth-child(2n+1) i:nth-child(2n + 1) {
  background-color: rgb(255, 12, 12);
}

.checker-blocks-row:nth-child(2n) i:nth-child(2n) {
  background-color: rgb(255, 12, 12);
}

.checker-blocks-row:nth-child(2n) i:nth-child(2n + 1) {
  background-color: rgb(16, 16, 16);
}</style>`;
  }

  querySelector(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  querySelectorAll(selector) {
    return this.shadowRoot.querySelectorAll(selector);
  }

}

customElements.define('checker-blocks', CheckerBlocks);