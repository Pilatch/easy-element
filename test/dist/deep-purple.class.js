class DeepPurple extends HTMLElement {
  connectedCallback() {}

}

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'deep-purple {  background-color: purple;}deep-purple {  color: white;}';
  document.head.appendChild(style);
})();

customElements.define('deep-purple', DeepPurple);