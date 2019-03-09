"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LoginForm =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(LoginForm, _HTMLElement);

  function LoginForm() {
    _classCallCheck(this, LoginForm);

    return _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).apply(this, arguments));
  }

  _createClass(LoginForm, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var contents = "\n  <form>\n    <label><slot name=\"username-label\">Username</slot>:<input type=\"text\" name=\"username\"  /></label>\n    <label><slot name=\"password-label\">Password</slot>:<input type=\"text\" name=\"password\"  /></label>\n  </form>\n";

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
}(HTMLElement);

"use strict";

window.addEventListener('WebComponentsReady', function () {
  customElements.define('login-form', LoginForm);
});