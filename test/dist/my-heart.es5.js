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

var MyHeart =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(MyHeart, _HTMLElement);

  function MyHeart() {
    _classCallCheck(this, MyHeart);

    return _possibleConstructorReturn(this, _getPrototypeOf(MyHeart).apply(this, arguments));
  }

  _createClass(MyHeart, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      this.innerHTML = "\n  <div class=\"my-heart_heart-container\">\n  </div>\n";
      var innerHeart = document.createElement('div');
      innerHeart.classList.add('my-heart_inner-heart'); // Test querySelector in both ES5 and shadowDOM

      this.querySelector('.my-heart_heart-container').appendChild(innerHeart);
      setInterval(function () {
        // Test querySelectorAll in both ES5 and shadowDOM
        var inner = _this.querySelectorAll('.my-heart_inner-heart')[0]; // .toggleAttribute doesn't exist in old IE


        if (inner.getAttribute('thump') === '') {
          inner.removeAttribute('thump');
        } else {
          inner.setAttribute('thump', "");
        }
      }, 1000);
    }
  }]);

  return MyHeart;
}(_wrapNativeSuper(HTMLElement));

"use strict";

;

(function () {
  var style = document.createElement('style');
  style.textContent = '/* Thanks to https: //codepen.io/hana-mignon/pen/HxGmr */my-heart {  display: inline-block;  height: 175px;  position: relative;}.my-heart_heart-container {  background-color: tomato;  width: 100px;  height: 100px;  position: relative;  top: 50px;  left: 50%;  transform: rotate(-45deg);}.my-heart_heart-container:before {  content: "";  width: 100px;  height: 100px;  border-radius: 50%;  background-color: tomato;  position: absolute;  top: -50px;  left: 0;}.my-heart_heart-container:after {  z-index: -1;  content: "";  width: 100px;  height: 100px;  border-radius: 50%;  background-color: tomato;  position: absolute;  top: 0px;  left: 50px;}.my-heart_inner-heart {  background-color: white;  width: 50px;  height: 50px;  position: relative;  top: 25px;  left: 25px;  z-index: 1;}.my-heart_inner-heart[thump],.my-heart_inner-heart[thump]:after,.my-heart_inner-heart[thump]:before {  background-color: pink;}.my-heart_inner-heart:before {  content: "";  width: 50px;  height: 50px;  border-radius: 50%;  background-color: white;  position: absolute;  top: -25px;  left: 0;}.my-heart_inner-heart:after {  z-index: -1;  content: "";  width: 50px;  height: 50px;  border-radius: 50%;  background-color: white;  position: absolute;  top: 0px;  left: 25px;}';
  document.head.appendChild(style);
})();

"use strict";

window.addEventListener('WebComponentsReady', function () {
  customElements.define('my-heart', MyHeart);
});