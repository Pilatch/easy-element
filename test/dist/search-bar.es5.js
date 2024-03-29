"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SearchBar = /*#__PURE__*/function (_HTMLElement) {
  _inherits(SearchBar, _HTMLElement);

  var _super = _createSuper(SearchBar);

  function SearchBar() {
    _classCallCheck(this, SearchBar);

    return _super.apply(this, arguments);
  }

  _createClass(SearchBar, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.innerHTML = "\n  <form class=\"search-bar_form\">\n    <input class=\"search-bar_input\" placeholder=\"Search\">\n    <button class=\"search-bar_button\" type=\"submit\">Submit to THanos!</button>\n  </form>\n";
      this.input = this.querySelector('input');
      this.querySelector('form').addEventListener('submit', this.dispatchTerm.bind(this, 'submit'));
      this.input.addEventListener('keyup', this.dispatchTerm.bind(this, 'input'));
      var placeholder = this.getAttribute('placeholder');
      var value = this.getAttribute('value');

      if (placeholder) {
        this.input.setAttribute('placeholder', placeholder);
      }

      if (typeof value === 'string') {
        this.input.value = value;
      }
    }
  }, {
    key: "dispatchTerm",
    value: function dispatchTerm(eventSuffix, event) {
      event.preventDefault();
      event = new CustomEvent('search-bar-' + eventSuffix, {
        bubbles: true,
        composed: true,
        detail: {
          term: this.input.value
        }
      });
      this.dispatchEvent(event);
    }
  }, {
    key: "value",
    get: function get() {
      return this.input.value;
    },
    set: function set(newValue) {
      this.input.value = newValue;
    }
  }]);

  return SearchBar;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

"use strict";

window.addEventListener('WebComponentsReady', function () {
  customElements.define('search-bar', SearchBar);
});

"use strict";

;

(function () {
  var style = document.createElement('style');
  style.textContent = '.search-bar_form {  position: relative;  overflow-x: hidden;}.search-bar_input,.search-bar_button {  font-family: \'Open Sans\', sans-serif;}.search-bar_form,.search-bar_input,.search-bar_button {  border: 0;  box-sizing: border-box;  height: 6rem;  outline: 0;}.search-bar_input {  float: left;  font-size: 1.4rem;  margin: 0;  padding: 0;  padding-left: 1rem;  width: calc(100% - 11rem);  transition: all .3s ease;}.search-bar_input::-ms-clear {  display: none;}.search-bar_input:focus,.search-bar_button:focus,.search-bar_button::-moz-focus-inner {  border: 0;  outline: none;}.search-bar_button {  color: #ffffff;  background-color: chocolate;  font-size: 1.8rem;  font-weight: 100;  transition: all .25s ease;  width: 11rem;}.search-bar_button:hover {  background-color: sienna;}.search-bar_button:focus {  background-color: sienna;}';
  document.head.appendChild(style);
})();