class SimpleBling extends HTMLElement {}

window.addEventListener('WebComponentsReady', () => {
  customElements.define('simple-bling', SimpleBling);
});

customElements.define('simple-bling', SimpleBling);