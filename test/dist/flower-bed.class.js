class FlowerBed extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `<section class="garden">
  <div class="flower flower-01">
      <div class="stem"></div>
      <div class="base">
        <div class="petals"></div>
    </div>
  </div>
  <div class="flower flower-02">
      <div class="stem"></div>
      <div class="base">
        <div class="petals"></div>
    </div>
  </div>
  <div class="flower flower-03">
      <div class="stem"></div>
      <div class="base">
        <div class="petals"></div>
    </div>
  </div>
  <div class="flower flower-04">
      <div class="stem"></div>
      <div class="base">
        <div class="petals"></div>
    </div>
  </div>
</section>
<style>:host {
  background-color: #d6fdff;
  display: block;
  height: 505px;
  /* ////////  */
  /* /////////// */
  /* Flower base styles */
}

:host .garden {
  margin-left: -50px;
}

:host .flower {
  margin-left: -70px;
}

:host .flower-01 {
  margin-left: 0;
}

:host .flower-01 {
  height: 300px;
  width: 300px;
}

:host .flower-01 .base:before {
  background-color: #efd34f;
  width: 50px;
  height: 50px;
}

:host .flower-01 .petal:before {
  background-color: #40afbf;
  height: 150px;
  width: 50px;
}

:host .flower-01 .petals {
  transform-origin: 50% 50%;
  animation: spinning-flowers 20s linear infinite;
}

:host .flower-01 .stem {
  width: 7px;
  height: 200px;
  transform: translate(-50%) rotate(2deg);
}

:host .flower-02 {
  height: 200px;
  width: 200px;
}

:host .flower-02 .base:before {
  background-color: #ffc260;
  width: 60px;
  height: 60px;
}

:host .flower-02 .petal:before {
  background-color: #9245ba;
  height: 100px;
  width: 50px;
}

:host .flower-02 .petals {
  transform-origin: 50% 50%;
  animation: spinning-flowers 7s linear infinite reverse;
}

:host .flower-02 .stem {
  width: 10px;
  height: 300px;
  transform: translate(-50%) rotate(3deg);
}

:host .flower-03,
:host .flower-03b {
  height: 240px;
  width: 240px;
}

:host .flower-03 .base:before,
:host .flower-03b .base:before {
  background-color: #efd34f;
  width: 75px;
  height: 75px;
}

:host .flower-03 .petal:before,
:host .flower-03b .petal:before {
  background-color: #a817aa;
  height: 120px;
  width: 90px;
}

:host .flower-03 .petals,
:host .flower-03b .petals {
  transform-origin: 50% 50%;
  animation: spinning-flowers 20s linear infinite;
}

:host .flower-03 .stem,
:host .flower-03b .stem {
  width: 15px;
  height: 300px;
  transform: translate(-50%) rotate(-2deg);
}

:host .flower-03b {
  transform: scale(0.7);
}

:host .flower-03b .petals {
  transform-origin: 50% 50%;
  animation: spinning-flowers 10s linear infinite;
}

:host .flower-03b .petal:before {
  background-color: #a817aa;
}

:host .flower-04 {
  height: 240px;
  width: 240px;
}

:host .flower-04 .base:before {
  background-color: #ffc260;
  width: 40px;
  height: 40px;
}

:host .flower-04 .petal:before {
  background-color: #3542ce;
  height: 120px;
  width: 30px;
}

:host .flower-04 .petals {
  transform-origin: 50% 50%;
  animation: spinning-flowers 20s linear infinite reverse;
}

:host .flower-04 .stem {
  width: 7px;
  height: 300px;
  transform: translate(-50%) rotate(1deg);
}

:host .stem {
  background-color: #21b74b;
  position: absolute;
  left: 50%;
  top: 50%;
}

:host .flower {
  display: inline-block;
  position: relative;
}

:host .flower .base {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  height: 100px;
  width: 100px;
}

:host .flower .base:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  border-radius: 50%;
}

:host .flower .petals {
  height: 100%;
  width: 100%;
  position: relative;
}

:host .flower .petal {
  height: 75px;
  width: 1px;
  background-color: transparent;
  position: absolute;
  z-index: 99;
}

:host .flower .petal:before {
  content: "";
  position: absolute;
  transform: translateX(-50%);
  border-radius: 50%;
}

:host .flower .petal1 {
  top: -75px;
  left: 50%;
  transform: translateX(-50%);
}

:host .flower .petal2 {
  transform: rotate(70deg);
  top: -15px;
  right: -30px;
}

:host .flower .petal3 {
  bottom: -55px;
  right: 0px;
  transform: rotate(145deg);
}

:host .flower .petal4 {
  bottom: -55px;
  left: 0px;
  transform: rotate(215deg);
}

:host .flower .petal5 {
  transform: rotate(290deg);
  top: -15px;
  left: -30px;
}

:host .no-animate {
  animation: 0 none !important;
}

@-webkit-keyframes spinning-flowers {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes spinning-flowers {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}</style>`;
    this.querySelectorAll('.petals').forEach(petals => {
      petals.innerHTML = `
        <div class="petal petal1"></div>
        <div class="petal petal2"></div>
        <div class="petal petal3"></div>
        <div class="petal petal4"></div>
        <div class="petal petal5"></div>`;
    });
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

customElements.define('flower-bed', FlowerBed);