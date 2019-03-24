class AhChoo extends HTMLElement {
  connectedCallback() {
    var contents = `
  <p>Whenever I sneeze, I also <slot>cough</slot>.</p>
`;

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

}

window.addEventListener('WebComponentsReady', () => {
  customElements.define('ah-choo', AhChoo);
});

class BlueButton extends HTMLElement {
  connectedCallback() {
    var contents = `<button><slot>Push this button!</slot></button>
`;

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

    this.querySelector('button').addEventListener('click', event => {
      this.classList.toggle('light');
    });
  }

}

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'blue-button button {  background-color: blue;  border: 0;  box-shadow: 2px 2px 2px gray;  color: white;  font-size: 1.5em;}blue-button.light button {  background-color: lightblue;  color: black;}';
  document.head.appendChild(style);
})();

window.addEventListener('WebComponentsReady', () => {
  customElements.define('blue-button', BlueButton);
});

class IPad extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
  <div class="i-pad_inner"></div>
`;
  }

}

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'i-pad {  background-color: white;  border: 1px solid gray;  border-radius: 10px;  display: inline-block;  height: 150px;  padding: 10px;  width: 200px;}i-pad .i-pad_inner {  display: inline-block;  background-color: black;  height: 150px;  width: 100%;}';
  document.head.appendChild(style);
})();

window.addEventListener('WebComponentsReady', () => {
  customElements.define('i-pad', IPad);
});

class LoginForm extends HTMLElement {
  connectedCallback() {
    var contents = `
  <form>
    <label><slot name="username-label">Username</slot>:<input type="text" name="username"  /></label>
    <label><slot name="password-label">Password</slot>:<input type="text" name="password"  /></label>
  </form>
`;

    if (this.childNodes.length) {
      var template = document.createElement('div');
      template.innerHTML = contents;

      this.__distributeContentToSlots__(template);

      this.innerHTML = template.innerHTML;
    } else {
      this.innerHTML = contents;
    }
  }

  __fillSlot__(destinationSlot, content) {
    while (destinationSlot.childNodes.length) {
      destinationSlot.removeChild(destinationSlot.lastChild);
    }

    destinationSlot.appendChild(content);
  }

  __distributeContentToSlots__(template) {
    let lightDomElements = this.querySelectorAll('[slot]');
    let namedSlots = template.querySelectorAll('slot[name]');

    if (lightDomElements.length > namedSlots.length) {
      console.error(`The ${this.tagName.toLowerCase()} template has ${namedSlots.length} <slot> elements, but is being sent ${lightDomElements.length}.\nOffending element:`);
      console.log(this);
    } else {
      namedSlots.forEach(destinationSlot => {
        let name = destinationSlot.getAttribute('name');
        let matchingContent = this.querySelector(`[slot="${name}"]`);

        if (matchingContent) {
          this.__fillSlot__(destinationSlot, matchingContent);
        }
      });
    }
  }

}

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'login-form label {  font-family: sans-serif;}';
  document.head.appendChild(style);
})();

window.addEventListener('WebComponentsReady', () => {
  customElements.define('login-form', LoginForm);
});

class MyHeart extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
  <div class="my-heart_heart-container">
  </div>
`;
    let innerHeart = document.createElement('div');
    innerHeart.classList.add('my-heart_inner-heart'); // Test querySelector in both ES5 and shadowDOM

    this.querySelector('.my-heart_heart-container').appendChild(innerHeart);
    setInterval(() => {
      // Test querySelectorAll in both ES5 and shadowDOM
      let inner = this.querySelectorAll('.my-heart_inner-heart')[0]; // .toggleAttribute doesn't exist in old IE

      if (inner.getAttribute('thump') === '') {
        inner.removeAttribute('thump');
      } else {
        inner.setAttribute('thump', "");
      }
    }, 1000);
  }

}

;

(function () {
  var style = document.createElement('style');
  style.textContent = '/* Thanks to https: //codepen.io/hana-mignon/pen/HxGmr */my-heart {  display: inline-block;  height: 175px;  position: relative;}.my-heart_heart-container {  background-color: tomato;  width: 100px;  height: 100px;  position: relative;  top: 50px;  left: 50%;  transform: rotate(-45deg);}.my-heart_heart-container:before {  content: "";  width: 100px;  height: 100px;  border-radius: 50%;  background-color: tomato;  position: absolute;  top: -50px;  left: 0;}.my-heart_heart-container:after {  z-index: -1;  content: "";  width: 100px;  height: 100px;  border-radius: 50%;  background-color: tomato;  position: absolute;  top: 0px;  left: 50px;}.my-heart_inner-heart {  background-color: white;  width: 50px;  height: 50px;  position: relative;  top: 25px;  left: 25px;  z-index: 1;}.my-heart_inner-heart[thump],.my-heart_inner-heart[thump]:after,.my-heart_inner-heart[thump]:before {  background-color: pink;}.my-heart_inner-heart:before {  content: "";  width: 50px;  height: 50px;  border-radius: 50%;  background-color: white;  position: absolute;  top: -25px;  left: 0;}.my-heart_inner-heart:after {  z-index: -1;  content: "";  width: 50px;  height: 50px;  border-radius: 50%;  background-color: white;  position: absolute;  top: 0px;  left: 25px;}';
  document.head.appendChild(style);
})();

window.addEventListener('WebComponentsReady', () => {
  customElements.define('my-heart', MyHeart);
});

class NameTag extends HTMLElement {
  connectedCallback() {
    var contents = `
  <h2 class="name-tag_heading">Hello, my name is</h2>
  <div class="name-tag_name-container">
    <slot></slot>
  </div>
`;

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

}

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'name-tag {  display: inline-block;  width: 400px;}.name-tag_heading {  background-color: red;  border-top-left-radius: 12px;  border-top-right-radius: 12px;  color: white;  padding: 0.5em;  margin: 0;}name-tag.dark {  background-color: black;}.name-tag_name-container {  background-color: white;  border: 1px solid red;  border-bottom-left-radius: 12px;  border-bottom-right-radius: 12px;  padding: 1em 0.5em;  font-size: 3em;  text-align: center;}';
  document.head.appendChild(style);
})();

window.addEventListener('WebComponentsReady', () => {
  customElements.define('name-tag', NameTag);
});

class PillText2 extends HTMLElement {
  connectedCallback() {}

}

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'pill-text-2 {  background-color: #80ff80;  border-radius: 1em;  padding-left: 0.5em;}pill-text-2::after {  background-color: #ffd076;  content: "!";  display: inline-block;  width: 1.5em;  text-align: center;}';
  document.head.appendChild(style);
})();

window.addEventListener('WebComponentsReady', () => {
  customElements.define('pill-text-2', PillText2);
});

class RadioButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
<div class="wrap">
  <input type="radio" id="on" name="radio" />
  <label for="on">ON</label>

  <input type="radio" id="off" name="radio" />
  <label for="off">OFF</label>

  <div class="bar"></div>
</div>
`;
  }

}

;

(function () {
  var style = document.createElement('style');
  style.textContent = 'radio-button {  background: #1e1e1e;  border-radius: 50px;  padding: 10px 15px;  color: #626262;  font-weight: bold;  display: flex;  justify-content: space-between;  align-items: center;  height: 45px;  width: 245px;  font-size: 21px;  position: relative;  transition: all 0.5s ease-in-out;  margin-bottom: 20px;}radio-button.off {  background: #fff;}radio-button.off .bar {  background: #ccc;  left: 136px;}radio-button.off label[for=on] {  color: #626262;}radio-button.off label[for=off] {  color: #000;}radio-button .wrap {  width: 100%;  display: flex;  justify-content: space-between;  align-items: center;  border-radius: 50px;  overflow: hidden;  position: relative;  height: 40px;}radio-button input {  opacity: 0;  pointer-events: none;}radio-button label {  position: relative;  z-index: 1;  cursor: pointer;  transition: all 0.5s ease-in-out;  user-select: none;}radio-button label[for=on] {  margin-left: 10px;  color: #000;}radio-button label[for=off] {  margin-right: 10px;}radio-button #on {  position: absolute;  left: 0;  top: 50%;  transform: translateY(-50%);}radio-button #off {  position: absolute;  right: 0;  top: 50%;  transform: translateY(-50%);}radio-button .bar {  position: absolute;  left: -90px;  top: 50%;  transform: translateY(-50%);  background: #fff;  height: 40px;  width: 200px;  border-radius: 50px;  transition: all 0.5s ease-in-out;}';
  document.head.appendChild(style);
})();

window.addEventListener('WebComponentsReady', () => {
  customElements.define('radio-button', RadioButton);
});

class StarRating extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
  <div class="star-rating_container">
    <div class="star-rating_star" data-position="1"></div>
    <div class="star-rating_star" data-position="2"></div>
    <div class="star-rating_star" data-position="3"></div>
    <div class="star-rating_star" data-position="4"></div>
    <div class="star-rating_star" data-position="5"></div>
  </div>
`;
    this._rating = 0;
    this.addEventListener('click', event => {
      let positionClicked = parseInt(event.target.getAttribute('data-position'), 10);
      this.rating = positionClicked;
    });
  }

  set rating(newRating) {
    if (newRating === this._rating) {
      this._rating = 0;
    } else {
      this._rating = newRating;
    }

    for (let i = 1; i < 6; i++) {
      let star = this.querySelector(`[data-position="${i}"]`);

      if (i > this._rating) {
        star.classList.remove('star-rating_solid');
      } else {
        star.classList.add('star-rating_solid');
      }
    }
  }

}

;

(function () {
  var style = document.createElement('style');
  style.textContent = '.star-rating_star {  display: inline-block;  font-size: 150%;  height: 1em;  position: relative;  width: 1em;}.star-rating_star::before {  content: \'\\2606\';  left: 0;  position: absolute;  top: 0;}.star-rating_solid::before {  content: \'\\2605\';  position: absolute;  top: 0;  left: 0;}';
  document.head.appendChild(style);
})();

window.addEventListener('WebComponentsReady', () => {
  customElements.define('star-rating', StarRating);
});

class StarRating extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `
  <div class="star-rating_container">
    <div class="star-rating_star" data-position="1"></div>
    <div class="star-rating_star" data-position="2"></div>
    <div class="star-rating_star" data-position="3"></div>
    <div class="star-rating_star" data-position="4"></div>
    <div class="star-rating_star" data-position="5"></div>
  </div>
<style>.star-rating_star {
  display: inline-block;
  font-size: 150%;
  height: 1em;
  position: relative;
  width: 1em;
}

.star-rating_star::before {
  content: '\\2606';
  left: 0;
  position: absolute;
  top: 0;
}

.star-rating_solid::before {
  content: '\\2605';
  position: absolute;
  top: 0;
  left: 0;
}</style>`;
    this._rating = 0;
    this.addEventListener('click', event => {
      let positionClicked = parseInt(event.target.getAttribute('data-position'), 10);
      this.rating = positionClicked;
    });
  }

  set rating(newRating) {
    if (newRating === this._rating) {
      this._rating = 0;
    } else {
      this._rating = newRating;
    }

    for (let i = 1; i < 6; i++) {
      let star = this.querySelector(`[data-position="${i}"]`);

      if (i > this._rating) {
        star.classList.remove('star-rating_solid');
      } else {
        star.classList.add('star-rating_solid');
      }
    }
  }

  querySelector(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  querySelectorAll(selector) {
    return this.shadowRoot.querySelectorAll(selector);
  }

  addEventListener() {
    return this.shadowRoot.addEventListener.apply(this.shadowRoot, arguments);
  }

}

customElements.define('star-rating', StarRating);