class JackHammer extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `
<div class="container">
  <h1>JACKHAMMER</h1>
  <div class="jack-hammer">
    <div class="right-handle"></div>
     <div class="trigger"></div>
     <div class="hammer-body"></div>
     <div class="left-handle"></div>
    <div class="hammer-base"></div>
     <div class="hammer">
       <div class="arrow-down"></div>
    </div>
  </div>
</div><style>:host .jack-hammer {
  transform: rotate(15deg);
  -ms-transform: rotate(15deg);
  -webkit-transform: rotate(15deg);
}

:host .container {
  width: 500px;
  height: 500px;
  background-color: #F9F6F4;
  border-radius: 25px;
  margin: 0 auto;
}

:host .right-handle {
  width: 70px;
  height: 25px;
  background-color: #000;
  position: relative;
  top: 200px;
  left: 130px;
  border-radius: 10px 0 0 10px;
}

:host .left-handle {
  width: 70px;
  height: 25px;
  background-color: #000;
  position: relative;
  top: 75px;
  left: 300px;
  border-radius: 0 10px 10px 0;
}

:host .hammer-body {
  width: 100px;
  height: 100px;
  background-color: #700000;
  position: relative;
  top: 150px;
  left: 200px;
  border-radius: 10px;
}

:host .hammer {
  width: 25px;
  height: 125px;
  background-color: #ccc;
  position: relative;
  top: 45px;
  left: 237.5px;
  border-radius: 9px;
  animation: hammer 0.5s infinite;
  -moz-animation: hammer 0.3s infinite;
  -webkit-animation: hammer 0.3s infinite;
}

:host .hammer-base {
  z-index: 1;
  width: 50px;
  height: 125px;
  background-color: #700000;
  position: relative;
  top: 125px;
  left: 225px;
  border-radius: 0 0 15px 15px;
}

:host .arrow-down {
  position: relative;
  top: 120px;
  width: 0;
  height: 0;
  border-left: 12.75px solid transparent;
  border-right: 12.75px solid transparent;
  border-top: 25px solid #ccc;
  font-size: 0;
  line-height: 0;
  color: #ccc;
}

:host .trigger {
  height: 3px;
  width: 50px;
  border-radius: 25px;
  background-color: #000;
  transform: rotate(-15deg);
  transform-origin: 100% 0%;
  -ms-transform: rotate(-15deg);
  -webkit-transform: rotate(-15deg);
  position: relative;
  top: 200px;
  left: 152px;
  animation: tigger-pull 1s;
  -moz-animation: trigger-pull 1s infinite;
  -webkit-animation: trigger-pull 1s infinite;
  animation-duration: 4s;
  animation-fill-mode: forwards;
}

:host h1 {
  padding-top: 50px;
  margin-bottom: -100px;
  text-align: center;
  font-family: sans-serif;
}

@keyframes hammer {
  from {
    top: 45px;
  }

  to {
    top: 60px;
  }
}

@-moz-keyframes hammer {
  from {
    top: 45px;
  }

  to {
    top: 60px;
  }
}

@-webkit-keyframes hammer {
  from {
    top: 45px;
  }

  to {
    top: 60px;
  }
}

@keyframes trigger-pull {
  from {
    transform: rotate(-15deg);
  }

  to {
    transform: rotate(-7deg);
  }
}

@-moz-keyframes trigger-pull {
  from {
    transform: rotate(-15deg);
  }

  to {
    transform: rotate(-7deg);
  }
}

@-webkit-keyframes trigger-pull {
  from {
    transform: rotate(-15deg);
  }

  to {
    transform: rotate(-7deg);
  }
}</style>`;
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

customElements.define('jack-hammer', JackHammer);