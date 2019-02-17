"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PseudoBlocks =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(PseudoBlocks, _HTMLElement);

  function PseudoBlocks() {
    _classCallCheck(this, PseudoBlocks);

    return _possibleConstructorReturn(this, (PseudoBlocks.__proto__ || Object.getPrototypeOf(PseudoBlocks)).apply(this, arguments));
  }

  _createClass(PseudoBlocks, [{
    key: "connectedCallback",
    value: function connectedCallback() {}
  }]);

  return PseudoBlocks;
}(HTMLElement);

"use strict";

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'pseudo-blocks {  display: inline-block;  background-color: rgb(8, 223, 16);  height: 100px;  position: relative;  width: 100px;}pseudo-blocks::after {  background-color: rgb(255, 239, 16);  content: \'\';  height: 25px;  left: 25px;  position: absolute;  top: 25px;  width: 25px;}pseudo-blocks::before {  background-color: rgb(255, 239, 16);  content: \'\';  height: 25px;  left: 50px;  position: absolute;  top: 50px;  width: 25px;}';
  document.head.appendChild(style);
})();

"use strict";

window.addEventListener('WebComponentsReady', function () {
  customElements.define('pseudo-blocks', PseudoBlocks);
});