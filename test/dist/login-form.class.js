class LoginForm extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `
  <form>
    <label><slot name="username-label">Username</slot>:<input type="text" name="username"  /></label>
    <label><slot name="password-label">Password</slot>:<input type="text" name="password"  /></label>
  </form>
`;
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

customElements.define('login-form', LoginForm);