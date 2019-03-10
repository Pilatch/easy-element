class RadioButton extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `
<div class="wrap">
  <input type="radio" id="on" name="radio" />
  <label for="on">ON</label>

  <input type="radio" id="off" name="radio" />
  <label for="off">OFF</label>

  <div class="bar"></div>
</div>
<style>:host {
  background: #1e1e1e;
  border-radius: 50px;
  padding: 10px 15px;
  color: #626262;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45px;
  width: 245px;
  font-size: 21px;
  position: relative;
  transition: all 0.5s ease-in-out;
  margin-bottom: 20px;
}

:host.off {
  background: #fff;
}

:host.off .bar {
  background: #ccc;
  left: 136px;
}

:host.off label[for=on] {
  color: #626262;
}

:host.off label[for=off] {
  color: #000;
}

:host .wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 50px;
  overflow: hidden;
  position: relative;
  height: 40px;
}

:host input {
  opacity: 0;
  pointer-events: none;
}

:host label {
  position: relative;
  z-index: 1;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  user-select: none;
}

:host label[for=on] {
  margin-left: 10px;
  color: #000;
}

:host label[for=off] {
  margin-right: 10px;
}

:host #on {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

:host #off {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

:host .bar {
  position: absolute;
  left: -90px;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  height: 40px;
  width: 200px;
  border-radius: 50px;
  transition: all 0.5s ease-in-out;
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

customElements.define('radio-button', RadioButton);