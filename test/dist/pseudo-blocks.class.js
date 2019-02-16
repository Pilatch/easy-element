class PseudoBlocks extends HTMLElement {
  connectedCallback() {}

}

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'pseudo-blocks {  display: inline-block;  background-color: rgb(16, 255, 32);  height: 100px;  position: relative;  width: 100px;}pseudo-blocks::after {  background-color: rgb(255, 239, 16);  content: \'\';  height: 25px;  left: 25px;  position: absolute;  top: 25px;  width: 25px;}pseudo-blocks::before {  background-color: rgb(255, 239, 16);  content: \'\';  height: 25px;  left: 50px;  position: absolute;  top: 50px;  width: 25px;}';
  document.head.appendChild(style);
})();

customElements.define('pseudo-blocks', PseudoBlocks);