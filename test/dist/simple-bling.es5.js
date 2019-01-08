function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

let SimpleBling =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(SimpleBling, _HTMLElement);

  function SimpleBling() {
    _classCallCheck(this, SimpleBling);

    return _possibleConstructorReturn(this, (SimpleBling.__proto__ || Object.getPrototypeOf(SimpleBling)).apply(this, arguments));
  }

  return SimpleBling;
}(HTMLElement);

window.addEventListener('WebComponentsReady', function () {
  customElements.define('simple-bling', SimpleBling);
});