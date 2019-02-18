class PillText2 extends HTMLElement {
  connectedCallback() {}

}

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'pill-text-2 {  background-color: #80ff80;  border-radius: 1em;  padding-left: 0.5em;}pill-text-2::after {  background-color: #ffd076;  content: "!";  display: inline-block;  width: 1.5em;  text-align: center;}';
  document.head.appendChild(style);
})();

customElements.define('pill-text-2', PillText2);