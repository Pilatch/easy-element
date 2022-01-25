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

var LoginForm = /*#__PURE__*/function (_HTMLElement) {
  _inherits(LoginForm, _HTMLElement);

  var _super = _createSuper(LoginForm);

  function LoginForm() {
    _classCallCheck(this, LoginForm);

    return _super.apply(this, arguments);
  }

  _createClass(LoginForm, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var contents = "\n  <form>\n    <label><slot name=\"username-label\">Username</slot>:<input type=\"text\" name=\"username\" ></label>\n    <label><slot name=\"password-label\">Password</slot>:<input type=\"text\" name=\"password\" ></label>\n  </form>\n";

      if (this.childNodes.length) {
        var template = document.createElement('div');
        template.innerHTML = contents;

        this.__distributeContentToSlots__(template);

        this.innerHTML = template.innerHTML;
      } else {
        this.innerHTML = contents;
      }
    }
  }, {
    key: "__fillSlot__",
    value: function __fillSlot__(destinationSlot, content) {
      while (destinationSlot.childNodes.length) {
        destinationSlot.removeChild(destinationSlot.lastChild);
      }

      destinationSlot.appendChild(content);
    }
  }, {
    key: "__distributeContentToSlots__",
    value: function __distributeContentToSlots__(template) {
      var _this = this;

      var lightDomElements = this.querySelectorAll('[slot]');
      var namedSlots = template.querySelectorAll('slot[name]');

      if (lightDomElements.length > namedSlots.length) {
        console.error("The ".concat(this.tagName.toLowerCase(), " template has ").concat(namedSlots.length, " <slot> elements, but is being sent ").concat(lightDomElements.length, ".\nOffending element:"));
        console.log(this);
      } else {
        namedSlots.forEach(function (destinationSlot) {
          var name = destinationSlot.getAttribute('name');

          var matchingContent = _this.querySelector("[slot=\"".concat(name, "\"]"));

          if (matchingContent) {
            _this.__fillSlot__(destinationSlot, matchingContent);
          }
        });
      }
    }
  }]);

  return LoginForm;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

"use strict";

window.addEventListener('WebComponentsReady', function () {
  customElements.define('login-form', LoginForm);
});

"use strict";

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'login-form label {  font-family: sans-serif;}';
  document.head.appendChild(style);
})();