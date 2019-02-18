class PillText extends HTMLElement {
  connectedCallback() {}

}

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'pill-text {  background-color: #8080ff;  border-radius: 1em;  padding-left: 0.5em;}pill-text::after {  background-color: #ff8080;  content: "?";  display: inline-block;  width: 1.5em;  text-align: center;}';
  document.head.appendChild(style);
})();

customElements.define('pill-text', PillText);