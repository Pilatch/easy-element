"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RedButton =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(RedButton, _HTMLElement);

  function RedButton() {
    _classCallCheck(this, RedButton);

    return _possibleConstructorReturn(this, (RedButton.__proto__ || Object.getPrototypeOf(RedButton)).apply(this, arguments));
  }

  _createClass(RedButton, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      var contents = "\n  <button><slot>Never click this button!</slot></button>\n";

      if (this.childNodes.length) {
        var template = document.createElement('div');
        template.innerHTML = contents;
        var slot = template.querySelector('slot');

        while (slot.childNodes.length) {
          slot.removeChild(slot.lastChild);
        }

        while (this.childNodes.length) {
          slot.appendChild(this.firstChild);
        }

        this.innerHTML = template.innerHTML;
      } else {
        this.innerHTML = contents;
      }

      this.querySelector('button').addEventListener('click', function (event) {
        _this.classList.add('pushed');

        _this.querySelector('slot').textContent = 'BOOM!';
      });
    }
  }]);

  return RedButton;
}(HTMLElement);

"use strict";

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'red-button button {  background-color: red;  border: 0;  box-shadow: 2px 2px 2px gray;  color: white;  font-size: 1.5em;}red-button.pushed button {  background-color: orange;  color: black;  font-weight: bold;  font-size: 2.5em;  padding: 1em;}';
  document.head.appendChild(style);
})();

"use strict";

window.addEventListener('WebComponentsReady', function () {
  customElements.define('red-button', RedButton);
});