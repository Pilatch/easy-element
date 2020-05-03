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

var FlowerBed = /*#__PURE__*/function (_HTMLElement) {
  _inherits(FlowerBed, _HTMLElement);

  var _super = _createSuper(FlowerBed);

  function FlowerBed() {
    _classCallCheck(this, FlowerBed);

    return _super.apply(this, arguments);
  }

  _createClass(FlowerBed, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.innerHTML = "<section class=\"garden\">\n  <div class=\"flower flower-01\">\n      <div class=\"stem\"></div>\n      <div class=\"base\">\n        <div class=\"petals\"></div>\n    </div>\n  </div>\n  <div class=\"flower flower-02\">\n      <div class=\"stem\"></div>\n      <div class=\"base\">\n        <div class=\"petals\"></div>\n    </div>\n  </div>\n  <div class=\"flower flower-03\">\n      <div class=\"stem\"></div>\n      <div class=\"base\">\n        <div class=\"petals\"></div>\n    </div>\n  </div>\n  <div class=\"flower flower-04\">\n      <div class=\"stem\"></div>\n      <div class=\"base\">\n        <div class=\"petals\"></div>\n    </div>\n  </div>\n</section>\n";
      this.querySelectorAll('.petals').forEach(function (petals) {
        petals.innerHTML = "\n        <div class=\"petal petal1\"></div>\n        <div class=\"petal petal2\"></div>\n        <div class=\"petal petal3\"></div>\n        <div class=\"petal petal4\"></div>\n        <div class=\"petal petal5\"></div>";
      });
    }
  }]);

  return FlowerBed;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

"use strict";

window.addEventListener('WebComponentsReady', function () {
  customElements.define('flower-bed', FlowerBed);
});

"use strict";

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'flower-bed {  background-color: #d6fdff;  display: block;  height: 505px;  /* ////////  */  /* /////////// */  /* Flower base styles */}flower-bed .garden {  margin-left: -50px;}flower-bed .flower {  margin-left: -70px;}flower-bed .flower-01 {  margin-left: 0;}flower-bed .flower-01 {  height: 300px;  width: 300px;}flower-bed .flower-01 .base:before {  background-color: #efd34f;  width: 50px;  height: 50px;}flower-bed .flower-01 .petal:before {  background-color: #40afbf;  height: 150px;  width: 50px;}flower-bed .flower-01 .petals {  transform-origin: 50% 50%;  animation: spinning-flowers 20s linear infinite;}flower-bed .flower-01 .stem {  width: 7px;  height: 200px;  transform: translate(-50%) rotate(2deg);}flower-bed .flower-02 {  height: 200px;  width: 200px;}flower-bed .flower-02 .base:before {  background-color: #ffc260;  width: 60px;  height: 60px;}flower-bed .flower-02 .petal:before {  background-color: #9245ba;  height: 100px;  width: 50px;}flower-bed .flower-02 .petals {  transform-origin: 50% 50%;  animation: spinning-flowers 7s linear infinite reverse;}flower-bed .flower-02 .stem {  width: 10px;  height: 300px;  transform: translate(-50%) rotate(3deg);}flower-bed .flower-03,flower-bed .flower-03b {  height: 240px;  width: 240px;}flower-bed .flower-03 .base:before,flower-bed .flower-03b .base:before {  background-color: #efd34f;  width: 75px;  height: 75px;}flower-bed .flower-03 .petal:before,flower-bed .flower-03b .petal:before {  background-color: #a817aa;  height: 120px;  width: 90px;}flower-bed .flower-03 .petals,flower-bed .flower-03b .petals {  transform-origin: 50% 50%;  animation: spinning-flowers 20s linear infinite;}flower-bed .flower-03 .stem,flower-bed .flower-03b .stem {  width: 15px;  height: 300px;  transform: translate(-50%) rotate(-2deg);}flower-bed .flower-03b {  transform: scale(0.7);}flower-bed .flower-03b .petals {  transform-origin: 50% 50%;  animation: spinning-flowers 10s linear infinite;}flower-bed .flower-03b .petal:before {  background-color: #a817aa;}flower-bed .flower-04 {  height: 240px;  width: 240px;}flower-bed .flower-04 .base:before {  background-color: #ffc260;  width: 40px;  height: 40px;}flower-bed .flower-04 .petal:before {  background-color: #3542ce;  height: 120px;  width: 30px;}flower-bed .flower-04 .petals {  transform-origin: 50% 50%;  animation: spinning-flowers 20s linear infinite reverse;}flower-bed .flower-04 .stem {  width: 7px;  height: 300px;  transform: translate(-50%) rotate(1deg);}flower-bed .stem {  background-color: #21b74b;  position: absolute;  left: 50%;  top: 50%;}flower-bed .flower {  display: inline-block;  position: relative;}flower-bed .flower .base {  position: absolute;  transform: translate(-50%, -50%);  top: 50%;  left: 50%;  height: 100px;  width: 100px;}flower-bed .flower .base:before {  content: "";  position: absolute;  top: 50%;  left: 50%;  transform: translate(-50%, -50%);  z-index: 100;  border-radius: 50%;}flower-bed .flower .petals {  height: 100%;  width: 100%;  position: relative;}flower-bed .flower .petal {  height: 75px;  width: 1px;  background-color: transparent;  position: absolute;  z-index: 99;}flower-bed .flower .petal:before {  content: "";  position: absolute;  transform: translateX(-50%);  border-radius: 50%;}flower-bed .flower .petal1 {  top: -75px;  left: 50%;  transform: translateX(-50%);}flower-bed .flower .petal2 {  transform: rotate(70deg);  top: -15px;  right: -30px;}flower-bed .flower .petal3 {  bottom: -55px;  right: 0px;  transform: rotate(145deg);}flower-bed .flower .petal4 {  bottom: -55px;  left: 0px;  transform: rotate(215deg);}flower-bed .flower .petal5 {  transform: rotate(290deg);  top: -15px;  left: -30px;}flower-bed .no-animate {  animation: 0 none !important;}@-webkit-keyframes spinning-flowers {  from {    transform: rotate(0deg);  }  to {    transform: rotate(360deg);  }}@keyframes spinning-flowers {  from {    transform: rotate(0deg);  }  to {    transform: rotate(360deg);  }}';
  document.head.appendChild(style);
})();