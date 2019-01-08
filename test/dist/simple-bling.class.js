class SimpleBling extends HTMLElement {}

window.addEventListener('WebComponentsReady', function () {
  customElements.define('simple-bling', SimpleBling);
});