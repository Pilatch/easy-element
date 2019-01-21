function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

let SearchBar =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(SearchBar, _HTMLElement);

  function SearchBar() {
    _classCallCheck(this, SearchBar);

    return _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).apply(this, arguments));
  }

  _createClass(SearchBar, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.innerHTML = "\n  <form class=\"search-bar_form\">\n    <input class=\"search-bar_input\" placeholder=\"Search\" />\n    <button class=\"search-bar_button\" type=\"submit\">Submit to THanos!</button>\n  </form>\n";
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
    get: function () {
      return this.input.value;
    },
    set: function (newValue) {
      this.input.value = newValue;
    }
  }]);

  return SearchBar;
}(HTMLElement);

;

(function () {
  var style = document.createElement('style');
  style.textContent = '.search-bar_form {  position: relative;  overflow-x: hidden;}.search-bar_input,.search-bar_button {  font-family: \'Open Sans\', sans-serif;}.search-bar_form,.search-bar_input,.search-bar_button {  border: 0;  box-sizing: border-box;  height: 6rem;  outline: 0;}.search-bar_input {  float: left;  font-size: 1.4rem;  margin: 0;  padding: 0;  padding-left: 1rem;  width: calc(100% - 11rem);  transition: all .3s ease;}.search-bar_input::-ms-clear {  display: none;}.search-bar_input:focus,.search-bar_button:focus,.search-bar_button::-moz-focus-inner {  border: 0;  outline: none;}.search-bar_button {  color: #ffffff;  background-color: chocolate;  font-size: 1.8rem;  font-weight: 100;  transition: all .25s ease;  width: 11rem;}.search-bar_button:hover {  background-color: sienna;}.search-bar_button:focus {  background-color: sienna;}';
  document.head.appendChild(style);
})();

window.addEventListener('WebComponentsReady', () => {
  customElements.define('search-bar', SearchBar);
});