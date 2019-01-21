class HighLight extends HTMLElement {
  connectedCallback() {}

}

;

(function () {
  var style = document.createElement('style');
  style.textContent = '/**This file is intended to test the watcher functionality.Change the background-color and see if your page automatically refreshes.**/high-light {  background-color: yellow;}';
  document.head.appendChild(style);
})();

customElements.define('high-light', HighLight);