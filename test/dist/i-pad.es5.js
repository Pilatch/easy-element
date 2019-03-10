"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var IPad =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(IPad, _HTMLElement);

  function IPad() {
    _classCallCheck(this, IPad);

    return _possibleConstructorReturn(this, (IPad.__proto__ || Object.getPrototypeOf(IPad)).apply(this, arguments));
  }

  _createClass(IPad, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.innerHTML = "\n  <div class=\"i-pad_inner\"></div>\n";
    }
  }]);

  return IPad;
}(HTMLElement);

"use strict";

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'i-pad {  background-color: white;  border: 1px solid gray;  border-radius: 10px;  display: inline-block;  height: 150px;  padding: 10px;  width: 200px;}i-pad .i-pad_inner {  display: inline-block;  background-color: black;  height: 150px;  width: 100%;}';
  document.head.appendChild(style);
})();

"use strict";

window.addEventListener('WebComponentsReady', function () {
  customElements.define('i-pad', IPad);
});