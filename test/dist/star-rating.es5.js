"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var StarRating =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(StarRating, _HTMLElement);

  function StarRating() {
    _classCallCheck(this, StarRating);

    return _possibleConstructorReturn(this, (StarRating.__proto__ || Object.getPrototypeOf(StarRating)).apply(this, arguments));
  }

  _createClass(StarRating, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      this.innerHTML = "\n  <div class=\"star-rating_container\">\n    <div class=\"star-rating_star\" data-position=\"1\"></div>\n    <div class=\"star-rating_star\" data-position=\"2\"></div>\n    <div class=\"star-rating_star\" data-position=\"3\"></div>\n    <div class=\"star-rating_star\" data-position=\"4\"></div>\n    <div class=\"star-rating_star\" data-position=\"5\"></div>\n  </div>\n";
      this._rating = 0;
      this.addEventListener('click', function (event) {
        var positionClicked = parseInt(event.target.getAttribute('data-position'), 10);
        _this.rating = positionClicked;
      });
    }
  }, {
    key: "rating",
    set: function set(newRating) {
      if (newRating === this._rating) {
        this._rating = 0;
      } else {
        this._rating = newRating;
      }

      for (var i = 1; i < 6; i++) {
        var star = this.querySelector("[data-position=\"".concat(i, "\"]"));

        if (i > this._rating) {
          star.classList.remove('star-rating_solid');
        } else {
          star.classList.add('star-rating_solid');
        }
      }
    }
  }]);

  return StarRating;
}(HTMLElement);

"use strict";

;

(function () {
  var style = document.createElement('style');
  style.textContent = '.star-rating_star {  display: inline-block;  font-size: 150%;  height: 1em;  position: relative;  width: 1em;}.star-rating_star::before {  content: \'\\2606\';  left: 0;  position: absolute;  top: 0;}.star-rating_solid::before {  content: \'\\2605\';  position: absolute;  top: 0;  left: 0;}';
  document.head.appendChild(style);
})();

"use strict";

window.addEventListener('WebComponentsReady', function () {
  customElements.define('star-rating', StarRating);
});