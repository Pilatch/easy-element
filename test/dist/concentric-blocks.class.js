class ConcentricBlocks extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `<div></div>
<span></span>
<style>:host {
  display: inline-block;
  background-color: #001199;
  height: 100px;
  position: relative;
  width: 100px;
}

:host div {
  background-color: #ff9911;
  height: 25px;
  left: 25px;
  position: absolute;
  top: 25px;
  width: 25px;
}

:host span {
  background-color: #ff9911;
  height: 25px;
  left: 50px;
  position: absolute;
  top: 50px;
  width: 25px;
}

:host(::after) {
  background-color: #ff9911;
  content: '!';
  height: 25px;
  left: 0;
  line-height: 25px;
  position: absolute;
  text-align: center;
  top: 0;
  width: 25px;
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

customElements.define('concentric-blocks', ConcentricBlocks);