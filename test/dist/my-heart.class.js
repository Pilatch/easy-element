class MyHeart extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `
  <div class="my-heart_heart-container">
  </div>
<style>/* Thanks to https: //codepen.io/hana-mignon/pen/HxGmr */

:host {
  display: inline-block;
  height: 175px;
  position: relative;
}

.my-heart_heart-container {
  background-color: tomato;
  width: 100px;
  height: 100px;
  position: relative;
  top: 50px;
  left: 50%;
  transform: rotate(-45deg);
}

.my-heart_heart-container:before {
  content: "";
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: tomato;
  position: absolute;
  top: -50px;
  left: 0;
}

.my-heart_heart-container:after {
  z-index: -1;
  content: "";
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: tomato;
  position: absolute;
  top: 0px;
  left: 50px;
}

.my-heart_inner-heart {
  background-color: white;
  width: 50px;
  height: 50px;
  position: relative;
  top: 25px;
  left: 25px;
  z-index: 1;
}

.my-heart_inner-heart[thump],
.my-heart_inner-heart[thump]:after,
.my-heart_inner-heart[thump]:before {
  background-color: pink;
}

.my-heart_inner-heart:before {
  content: "";
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: -25px;
  left: 0;
}

.my-heart_inner-heart:after {
  z-index: -1;
  content: "";
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: 0px;
  left: 25px;
}</style>`;
    let innerHeart = document.createElement('div');
    innerHeart.classList.add('my-heart_inner-heart'); // Test querySelector in both ES5 and shadowDOM

    // Test querySelector in both ES5 and shadowDOM
    this.querySelector('.my-heart_heart-container').appendChild(innerHeart);
    setInterval(() => {
      // Test querySelectorAll in both ES5 and shadowDOM
      let inner = this.querySelectorAll('.my-heart_inner-heart')[0]; // .toggleAttribute doesn't exist in old IE

      // .toggleAttribute doesn't exist in old IE
      if (inner.getAttribute('thump') === '') {
        inner.removeAttribute('thump');
      } else {
        inner.setAttribute('thump', "");
      }
    }, 1000);
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

  dispatchEvent(event) {
    return this.shadowRoot.dispatchEvent(event);
  }

}

customElements.define('my-heart', MyHeart);