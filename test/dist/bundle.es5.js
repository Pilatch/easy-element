"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

"use strict";

var AhChoo =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(AhChoo, _HTMLElement);

  function AhChoo() {
    _classCallCheck(this, AhChoo);

    return _possibleConstructorReturn(this, _getPrototypeOf(AhChoo).apply(this, arguments));
  }

  _createClass(AhChoo, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var contents = "\n  <p>Whenever I sneeze, I also <slot>cough</slot>.</p>\n";

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
    }
  }]);

  return AhChoo;
}(_wrapNativeSuper(HTMLElement));

"use strict";

window.addEventListener('WebComponentsReady', function () {
  customElements.define('ah-choo', AhChoo);
});

"use strict";

var BlueButton =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(BlueButton, _HTMLElement);

  function BlueButton() {
    _classCallCheck(this, BlueButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(BlueButton).apply(this, arguments));
  }

  _createClass(BlueButton, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      var contents = "<button><slot>Push this button!</slot></button>\n";

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
        _this.classList.toggle('light');
      });
    }
  }]);

  return BlueButton;
}(_wrapNativeSuper(HTMLElement));

"use strict";

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'blue-button button {  background-color: blue;  border: 0;  box-shadow: 2px 2px 2px gray;  color: white;  font-size: 1.5em;}blue-button.light button {  background-color: lightblue;  color: black;}';
  document.head.appendChild(style);
})();

"use strict";

window.addEventListener('WebComponentsReady', function () {
  customElements.define('blue-button', BlueButton);
});

"use strict";

var BlueSquare =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(BlueSquare, _HTMLElement);

  function BlueSquare() {
    _classCallCheck(this, BlueSquare);

    return _possibleConstructorReturn(this, _getPrototypeOf(BlueSquare).apply(this, arguments));
  }

  _createClass(BlueSquare, [{
    key: "connectedCallback",
    value: function connectedCallback() {}
  }]);

  return BlueSquare;
}(_wrapNativeSuper(HTMLElement));

"use strict";

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'blue-square {  background-color: blue;  opacity: 0.4;  display: inline-block;  width: 30px;  height: 30px;}';
  document.head.appendChild(style);
})();

"use strict";

window.addEventListener('WebComponentsReady', function () {
  customElements.define('blue-square', BlueSquare);
});

"use strict";

var ConStruct =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(ConStruct, _HTMLElement);

  function ConStruct() {
    var _this;

    _classCallCheck(this, ConStruct);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConStruct).call(this));
    console.log('I wuz con-structed.'); // Look in the console on the demo page.
    // This shouldn't throw any errors complaining about a lack of super()

    return _this;
  }

  _createClass(ConStruct, [{
    key: "connectedCallback",
    value: function connectedCallback() {}
  }]);

  return ConStruct;
}(_wrapNativeSuper(HTMLElement));

"use strict";

window.addEventListener('WebComponentsReady', function () {
  customElements.define('con-struct', ConStruct);
});

"use strict";

var IPad =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(IPad, _HTMLElement);

  function IPad() {
    _classCallCheck(this, IPad);

    return _possibleConstructorReturn(this, _getPrototypeOf(IPad).apply(this, arguments));
  }

  _createClass(IPad, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.innerHTML = "\n  <div class=\"i-pad_inner\"></div>\n";
    }
  }]);

  return IPad;
}(_wrapNativeSuper(HTMLElement));

"use strict";

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'i-pad {  background-color: white;  border: 1px solid gray;  border-radius: 10px;  display: inline-block;  height: 150px;  padding: 10px;  width: 200px;}i-pad .i-pad_inner {  display: inline-block;  background-color: black;  height: 150px;  width: 100%;}';
  document.head.appendChild(style);
})();

"use strict";

window.addEventListener('WebComponentsReady', function () {
  customElements.define('i-pad', IPad);
});

"use strict";

var LoginForm =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(LoginForm, _HTMLElement);

  function LoginForm() {
    _classCallCheck(this, LoginForm);

    return _possibleConstructorReturn(this, _getPrototypeOf(LoginForm).apply(this, arguments));
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
}(_wrapNativeSuper(HTMLElement));

"use strict";

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'login-form label {  font-family: sans-serif;}';
  document.head.appendChild(style);
})();

"use strict";

window.addEventListener('WebComponentsReady', function () {
  customElements.define('login-form', LoginForm);
});

"use strict";

var MultiSquare =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(MultiSquare, _HTMLElement);

  function MultiSquare() {
    _classCallCheck(this, MultiSquare);

    return _possibleConstructorReturn(this, _getPrototypeOf(MultiSquare).apply(this, arguments));
  }

  _createClass(MultiSquare, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.innerHTML = "\n  <blue-square></blue-square>\n  <red-square></red-square>\n";
    }
  }]);

  return MultiSquare;
}(_wrapNativeSuper(HTMLElement));

"use strict";

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'multi-square {  display: inline-block;  width: 45px;  height: 30px;  position: relative;}multi-square blue-square,multi-square red-square {  position: absolute;  left: 0;  top: 0;}multi-square blue-square {  left: 15px;}';
  document.head.appendChild(style);
})();

"use strict";

window.addEventListener('WebComponentsReady', function () {
  customElements.define('multi-square', MultiSquare);
});

"use strict";

var MyHeart =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(MyHeart, _HTMLElement);

  function MyHeart() {
    _classCallCheck(this, MyHeart);

    return _possibleConstructorReturn(this, _getPrototypeOf(MyHeart).apply(this, arguments));
  }

  _createClass(MyHeart, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      this.innerHTML = "\n  <div class=\"my-heart_heart-container\">\n  </div>\n";
      var innerHeart = document.createElement('div');
      innerHeart.classList.add('my-heart_inner-heart'); // Test querySelector in both ES5 and shadowDOM

      this.querySelector('.my-heart_heart-container').appendChild(innerHeart);
      setInterval(function () {
        // Test querySelectorAll in both ES5 and shadowDOM
        var inner = _this.querySelectorAll('.my-heart_inner-heart')[0]; // .toggleAttribute doesn't exist in old IE


        if (inner.getAttribute('thump') === '') {
          inner.removeAttribute('thump');
        } else {
          inner.setAttribute('thump', "");
        }
      }, 1000);
    }
  }]);

  return MyHeart;
}(_wrapNativeSuper(HTMLElement));

"use strict";

;

(function () {
  var style = document.createElement('style');
  style.textContent = '/* Thanks to https: //codepen.io/hana-mignon/pen/HxGmr */my-heart {  display: inline-block;  height: 175px;  position: relative;}.my-heart_heart-container {  background-color: tomato;  width: 100px;  height: 100px;  position: relative;  top: 50px;  left: 50%;  transform: rotate(-45deg);}.my-heart_heart-container:before {  content: "";  width: 100px;  height: 100px;  border-radius: 50%;  background-color: tomato;  position: absolute;  top: -50px;  left: 0;}.my-heart_heart-container:after {  z-index: -1;  content: "";  width: 100px;  height: 100px;  border-radius: 50%;  background-color: tomato;  position: absolute;  top: 0px;  left: 50px;}.my-heart_inner-heart {  background-color: white;  width: 50px;  height: 50px;  position: relative;  top: 25px;  left: 25px;  z-index: 1;}.my-heart_inner-heart[thump],.my-heart_inner-heart[thump]:after,.my-heart_inner-heart[thump]:before {  background-color: pink;}.my-heart_inner-heart:before {  content: "";  width: 50px;  height: 50px;  border-radius: 50%;  background-color: white;  position: absolute;  top: -25px;  left: 0;}.my-heart_inner-heart:after {  z-index: -1;  content: "";  width: 50px;  height: 50px;  border-radius: 50%;  background-color: white;  position: absolute;  top: 0px;  left: 25px;}';
  document.head.appendChild(style);
})();

"use strict";

window.addEventListener('WebComponentsReady', function () {
  customElements.define('my-heart', MyHeart);
});

"use strict";

var NameTag =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(NameTag, _HTMLElement);

  function NameTag() {
    _classCallCheck(this, NameTag);

    return _possibleConstructorReturn(this, _getPrototypeOf(NameTag).apply(this, arguments));
  }

  _createClass(NameTag, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var contents = "\n  <h2 class=\"name-tag_heading\">Hello, my name is</h2>\n  <div class=\"name-tag_name-container\">\n    <slot></slot>\n  </div>\n";

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

      var slot = 'I should not cause a namespace collision!';
    }
  }]);

  return NameTag;
}(_wrapNativeSuper(HTMLElement));

"use strict";

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'name-tag {  display: inline-block;  width: 400px;}.name-tag_heading {  background-color: red;  border-top-left-radius: 12px;  border-top-right-radius: 12px;  color: white;  padding: 0.5em;  margin: 0;}name-tag.dark {  background-color: black;}.name-tag_name-container {  background-color: white;  border: 1px solid red;  border-bottom-left-radius: 12px;  border-bottom-right-radius: 12px;  padding: 1em 0.5em;  font-size: 3em;  text-align: center;}';
  document.head.appendChild(style);
})();

"use strict";

window.addEventListener('WebComponentsReady', function () {
  customElements.define('name-tag', NameTag);
});

"use strict";

var PillText2 =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(PillText2, _HTMLElement);

  function PillText2() {
    _classCallCheck(this, PillText2);

    return _possibleConstructorReturn(this, _getPrototypeOf(PillText2).apply(this, arguments));
  }

  _createClass(PillText2, [{
    key: "connectedCallback",
    value: function connectedCallback() {}
  }]);

  return PillText2;
}(_wrapNativeSuper(HTMLElement));

"use strict";

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'pill-text-2 {  background-color: #80ff80;  border-radius: 1em;  padding-left: 0.5em;}pill-text-2::after {  background-color: #ffd076;  content: "!";  display: inline-block;  width: 1.5em;  text-align: center;}';
  document.head.appendChild(style);
})();

"use strict";

window.addEventListener('WebComponentsReady', function () {
  customElements.define('pill-text-2', PillText2);
});

"use strict";

var RadioButton =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(RadioButton, _HTMLElement);

  function RadioButton() {
    _classCallCheck(this, RadioButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(RadioButton).apply(this, arguments));
  }

  _createClass(RadioButton, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.innerHTML = "\n<div class=\"wrap\">\n  <input type=\"radio\" id=\"on\" name=\"radio\" />\n  <label for=\"on\">ON</label>\n\n  <input type=\"radio\" id=\"off\" name=\"radio\" />\n  <label for=\"off\">OFF</label>\n\n  <div class=\"bar\"></div>\n</div>\n";
    }
  }]);

  return RadioButton;
}(_wrapNativeSuper(HTMLElement));

"use strict";

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'radio-button {  background: #1e1e1e;  border-radius: 50px;  padding: 10px 15px;  color: #626262;  font-weight: bold;  display: flex;  justify-content: space-between;  align-items: center;  height: 45px;  width: 245px;  font-size: 21px;  position: relative;  transition: all 0.5s ease-in-out;  margin-bottom: 20px;}radio-button.off {  background: #fff;}radio-button.off .bar {  background: #ccc;  left: 136px;}radio-button.off label[for=on] {  color: #626262;}radio-button.off label[for=off] {  color: #000;}radio-button .wrap {  width: 100%;  display: flex;  justify-content: space-between;  align-items: center;  border-radius: 50px;  overflow: hidden;  position: relative;  height: 40px;}radio-button input {  opacity: 0;  pointer-events: none;}radio-button label {  position: relative;  z-index: 1;  cursor: pointer;  transition: all 0.5s ease-in-out;  user-select: none;}radio-button label[for=on] {  margin-left: 10px;  color: #000;}radio-button label[for=off] {  margin-right: 10px;}radio-button #on {  position: absolute;  left: 0;  top: 50%;  transform: translateY(-50%);}radio-button #off {  position: absolute;  right: 0;  top: 50%;  transform: translateY(-50%);}radio-button .bar {  position: absolute;  left: -90px;  top: 50%;  transform: translateY(-50%);  background: #fff;  height: 40px;  width: 200px;  border-radius: 50px;  transition: all 0.5s ease-in-out;}';
  document.head.appendChild(style);
})();

"use strict";

window.addEventListener('WebComponentsReady', function () {
  customElements.define('radio-button', RadioButton);
});

"use strict";

var RedSquare =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(RedSquare, _HTMLElement);

  function RedSquare() {
    _classCallCheck(this, RedSquare);

    return _possibleConstructorReturn(this, _getPrototypeOf(RedSquare).apply(this, arguments));
  }

  _createClass(RedSquare, [{
    key: "connectedCallback",
    value: function connectedCallback() {}
  }]);

  return RedSquare;
}(_wrapNativeSuper(HTMLElement));

"use strict";

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'red-square {  background-color: red;  opacity: 0.4;  display: inline-block;  width: 30px;  height: 30px;}';
  document.head.appendChild(style);
})();

"use strict";

window.addEventListener('WebComponentsReady', function () {
  customElements.define('red-square', RedSquare);
});

"use strict";

var StarRating =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(StarRating, _HTMLElement);

  function StarRating() {
    _classCallCheck(this, StarRating);

    return _possibleConstructorReturn(this, _getPrototypeOf(StarRating).apply(this, arguments));
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
}(_wrapNativeSuper(HTMLElement));

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