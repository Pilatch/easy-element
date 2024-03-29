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

;

(function () {
  'use strict';

  if (!window.whateverYouDoDontLoadRedButton) {
    var RedButton = /*#__PURE__*/function (_HTMLElement) {
      _inherits(RedButton, _HTMLElement);

      var _super = _createSuper(RedButton);

      function RedButton() {
        var _this;

        _classCallCheck(this, RedButton);

        _this = _super.call(this);

        if (!RedButton.firstTimeLoaded) {
          // pretend to do stuff on startup
          RedButton.firstTimeLoaded = true;
        }

        return _this;
      }

      _createClass(RedButton, [{
        key: "connectedCallback",
        value: function connectedCallback() {
          var _this2 = this;

          var contents = "\n  <button><slot>Never click this button!</slot></button>\n";

          if (this.childNodes.length) {
            var template = document.createElement('div');
            template.innerHTML = contents;

            var __slot__ = template.querySelector('slot');

            while (__slot__.childNodes.length) {
              __slot__.removeChild(__slot__.lastChild);
            }

            while (this.childNodes.length) {
              __slot__.appendChild(this.firstChild);
            }

            this.innerHTML = template.innerHTML;
          } else {
            this.innerHTML = contents;
          }

          this.querySelector('button').addEventListener('click', function (event) {
            _this2.classList.add('pushed');

            _this2.querySelector('slot').textContent = 'BOOM!';
          });
        }
      }]);

      return RedButton;
    }( /*#__PURE__*/_wrapNativeSuper(HTMLElement)); // Do some stuff outside the class to prove that any JS we write gets injected into the finished product.


    // Do some stuff outside the class to prove that any JS we write gets injected into the finished product.
    RedButton.firstTimeLoaded = false;
    "use strict";

    window.addEventListener('WebComponentsReady', function () {
      customElements.define('red-button', RedButton);
    });
  } else {
    console.error('Refused to load RedButton!');
  }
})();

"use strict";

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'red-button button {  background-color: red;  border: 0;  box-shadow: 2px 2px 2px gray;  color: white;  font-size: 1.5em;}red-button.pushed button {  background-color: orange;  color: black;  font-weight: bold;  font-size: 2.5em;  padding: 1em;}';
  document.head.appendChild(style);
})();