function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

let ToDo =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(ToDo, _HTMLElement);

  function ToDo() {
    _classCallCheck(this, ToDo);

    return _possibleConstructorReturn(this, (ToDo.__proto__ || Object.getPrototypeOf(ToDo)).apply(this, arguments));
  }

  _createClass(ToDo, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.innerHTML = "<h2>To-do list:</h2>\n<ol>\n  <li>Smile</li>\n  <li>Say thanks</li>\n  <li>Be quiet</li>\n</ol>\n";
    }
  }]);

  return ToDo;
}(HTMLElement);

window.addEventListener('WebComponentsReady', () => {
  customElements.define('to-do', ToDo);
});