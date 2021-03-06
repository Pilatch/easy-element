class LoginForm extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `
  <form>
    <label><slot name="username-label">Username</slot>:<input type="text" name="username" ></label>
    <label><slot name="password-label">Password</slot>:<input type="text" name="password" ></label>
  </form>
<style>:host label {
  font-family: sans-serif;
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

  dispatchEvent(event) {
    return this.shadowRoot.dispatchEvent(event);
  }

}

customElements.define('login-form', LoginForm);