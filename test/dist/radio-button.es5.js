"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var RadioButton =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(RadioButton, _HTMLElement);

  function RadioButton() {
    _classCallCheck(this, RadioButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(RadioButton).apply(this, arguments));
  }

  _createClass(RadioButton, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.innerHTML = "\n<div class=\"wrap\">\n  <input type=\"radio\" id=\"on\" name=\"radio\" />\n  <label for=\"on\">ON</label>\n\n  <input type=\"radio\" id=\"off\" name=\"radio\" />\n  <label for=\"off\">OFF</label>\n\n  <div class=\"bar\"></div>\n</div>\n";
    }
  }]);

  return RadioButton;
}(_wrapNativeSuper(HTMLElement));

"use strict";

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'radio-button {  background: #1e1e1e;  border-radius: 50px;  padding: 10px 15px;  color: #626262;  font-weight: bold;  display: flex;  justify-content: space-between;  align-items: center;  height: 45px;  width: 245px;  font-size: 21px;  position: relative;  transition: all 0.5s ease-in-out;  margin-bottom: 20px;}radio-button.off {  background: #fff;}radio-button.off .bar {  background: #ccc;  left: 136px;}radio-button.off label[for=on] {  color: #626262;}radio-button.off label[for=off] {  color: #000;}radio-button .wrap {  width: 100%;  display: flex;  justify-content: space-between;  align-items: center;  border-radius: 50px;  overflow: hidden;  position: relative;  height: 40px;}radio-button input {  opacity: 0;  pointer-events: none;}radio-button label {  position: relative;  z-index: 1;  cursor: pointer;  transition: all 0.5s ease-in-out;  user-select: none;}radio-button label[for=on] {  margin-left: 10px;  color: #000;}radio-button label[for=off] {  margin-right: 10px;}radio-button #on {  position: absolute;  left: 0;  top: 50%;  transform: translateY(-50%);}radio-button #off {  position: absolute;  right: 0;  top: 50%;  transform: translateY(-50%);}radio-button .bar {  position: absolute;  left: -90px;  top: 50%;  transform: translateY(-50%);  background: #fff;  height: 40px;  width: 200px;  border-radius: 50px;  transition: all 0.5s ease-in-out;}';
  document.head.appendChild(style);
})();

"use strict";

window.addEventListener('WebComponentsReady', function () {
  customElements.define('radio-button', RadioButton);
});