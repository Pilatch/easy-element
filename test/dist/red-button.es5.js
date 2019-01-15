function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

let RedButton =
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

      this.querySelector('button').addEventListener('click', event => {
        this.classList.add('pushed');
        this.querySelector('slot').textContent = 'BOOM!';
      });
    }
  }]);

  return RedButton;
}(HTMLElement);

window.addEventListener('WebComponentsReady', function () {
  customElements.define('red-button', RedButton);
});