class SimpleBling extends HTMLElement {
  connectedCallback() {}

}

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'simple-bling {  background-color: black;  color: gold;  font-weight: bold;  padding: 0.25em;}simple-bling:hover {  background-color: gold;  color: black;}';
  document.head.appendChild(style);
})();

customElements.define('simple-bling', SimpleBling);