"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var JackHammer = /*#__PURE__*/function (_HTMLElement) {
  _inherits(JackHammer, _HTMLElement);

  var _super = _createSuper(JackHammer);

  function JackHammer() {
    _classCallCheck(this, JackHammer);

    return _super.apply(this, arguments);
  }

  _createClass(JackHammer, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.innerHTML = "\n<div class=\"container\">\n  <h1>JACKHAMMER</h1>\n  <div class=\"jack-hammer\">\n    <div class=\"right-handle\"></div>\n     <div class=\"trigger\"></div>\n     <div class=\"hammer-body\"></div>\n     <div class=\"left-handle\"></div>\n    <div class=\"hammer-base\"></div>\n     <div class=\"hammer\">\n       <div class=\"arrow-down\"></div>\n    </div>\n  </div>\n</div>";
    }
  }]);

  return JackHammer;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

"use strict";

window.addEventListener('WebComponentsReady', function () {
  customElements.define('jack-hammer', JackHammer);
});

"use strict";

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'jack-hammer .jack-hammer {  transform: rotate(15deg);  -ms-transform: rotate(15deg);  -webkit-transform: rotate(15deg);}jack-hammer .container {  width: 500px;  height: 500px;  background-color: #F9F6F4;  border-radius: 25px;  margin: 0 auto;}jack-hammer .right-handle {  width: 70px;  height: 25px;  background-color: #000;  position: relative;  top: 200px;  left: 130px;  border-radius: 10px 0 0 10px;}jack-hammer .left-handle {  width: 70px;  height: 25px;  background-color: #000;  position: relative;  top: 75px;  left: 300px;  border-radius: 0 10px 10px 0;}jack-hammer .hammer-body {  width: 100px;  height: 100px;  background-color: #700000;  position: relative;  top: 150px;  left: 200px;  border-radius: 10px;}jack-hammer .hammer {  width: 25px;  height: 125px;  background-color: #ccc;  position: relative;  top: 45px;  left: 237.5px;  border-radius: 9px;  animation: hammer 0.5s infinite;  -moz-animation: hammer 0.3s infinite;  -webkit-animation: hammer 0.3s infinite;}jack-hammer .hammer-base {  z-index: 1;  width: 50px;  height: 125px;  background-color: #700000;  position: relative;  top: 125px;  left: 225px;  border-radius: 0 0 15px 15px;}jack-hammer .arrow-down {  position: relative;  top: 120px;  width: 0;  height: 0;  border-left: 12.75px solid transparent;  border-right: 12.75px solid transparent;  border-top: 25px solid #ccc;  font-size: 0;  line-height: 0;  color: #ccc;}jack-hammer .trigger {  height: 3px;  width: 50px;  border-radius: 25px;  background-color: #000;  transform: rotate(-15deg);  transform-origin: 100% 0%;  -ms-transform: rotate(-15deg);  -webkit-transform: rotate(-15deg);  position: relative;  top: 200px;  left: 152px;  animation: tigger-pull 1s;  -moz-animation: trigger-pull 1s infinite;  -webkit-animation: trigger-pull 1s infinite;  animation-duration: 4s;  animation-fill-mode: forwards;}jack-hammer h1 {  padding-top: 50px;  margin-bottom: -100px;  text-align: center;  font-family: sans-serif;}@keyframes hammer {  from {    top: 45px;  }  to {    top: 60px;  }}@-moz-keyframes hammer {  from {    top: 45px;  }  to {    top: 60px;  }}@-webkit-keyframes hammer {  from {    top: 45px;  }  to {    top: 60px;  }}@keyframes trigger-pull {  from {    transform: rotate(-15deg);  }  to {    transform: rotate(-7deg);  }}@-moz-keyframes trigger-pull {  from {    transform: rotate(-15deg);  }  to {    transform: rotate(-7deg);  }}@-webkit-keyframes trigger-pull {  from {    transform: rotate(-15deg);  }  to {    transform: rotate(-7deg);  }}';
  document.head.appendChild(style);
})();