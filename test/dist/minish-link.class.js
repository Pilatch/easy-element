class MinishLink extends HTMLElement {
  connectedCallback() {
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = `
  <div id="caja">
    <div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div>
    <div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel" id="contorno"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel"  id="verdeuno"></div><div class="pixel"  id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="contorno"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div>
    <div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel" id="contorno"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel"id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="contorno"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div>
    <div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel" id="contorno"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="contorno"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div>
    <div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel" id="contorno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="contorno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="contorno"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div> 
    <div class="pixel"></div><div class="pixel"></div><div class="pixel" id="contorno"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="contorno"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="contorno"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="contorno"></div><div class="pixel"></div><div class="pixel"></div>
    <div class="pixel" id="contorno"></div><div class="pixel" id="rosa"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="roml"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="roml"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="roml"></div><div class="pixel" id="contorno"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="rosa"></div><div class="pixel" id="contorno"></div>
    <div class="pixel" id="contorno"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="contorno"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="contorno"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="contorno"></div><div class="pixel" id="rosa"></div><div class="pixel" id="contorno"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="contorno"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="contorno"></div>
    <div class="pixel"></div><div class="pixel" id="contorno"></div><div class="pixel" id="rosa"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="roml"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="roml"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="contorno"></div><div class="pixel" id="roml"></div><div class="pixel" id="contorno"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="contorno"></div><div class="pixel"></div>
    <div class="pixel"></div><div class="pixel"></div><div class="pixel" id="contorno"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="contorno"></div><div class="pixel" id="roml"></div><div class="pixel" id="roml"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="contorno"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="contorno"></div><div class="pixel"></div><div class="pixel"></div>
    <div class="pixel"></div><div class="pixel"></div><div class="pixel" id="contorno"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="contorno"></div><div class="pixel"></div><div class="pixel"></div>
    <div class="pixel"></div><div class="pixel"></div><div class="pixel" id="contorno"></div><div class="pixel" id="roml"></div><div class="pixel" id="contorno"></div><div class="pixel" id="onix"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="onix"></div><div class="pixel" id="contorno"></div><div class="pixel" id="roml"></div><div class="pixel" id="contorno"></div><div class="pixel"></div><div class="pixel"></div>
    <div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="onix"></div><div class="pixel" id="contorno"></div><div class="pixel" id="onix"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="onix"></div><div class="pixel" id="contorno"></div><div class="pixel" id="onix"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div>
    <div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="onix"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="onix"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div>
    <div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel" id="contorno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="contorno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="contorno"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div>
    <div class="pixel"></div><div class="pixel"></div><div class="pixel" id="contorno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="contorno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="contorno"></div><div class="pixel"></div><div class="pixel"></div>
    <div class="pixel"></div><div class="pixel" id="contorno"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="contorno"></div><div class="pixel"></div>
    <div class="pixel"></div><div class="pixel" id="contorno"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="contorno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="rosa"></div><div class="pixel" id="rosa"></div><div class="pixel" id="contorno"></div><div class="pixel"></div>
    <div class="pixel"></div><div class="pixel"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="amarillo"></div><div class="pixel" id="contorno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel"></div><div class="pixel"></div>
    <div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdedos"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div>
    <div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel" id="contorno"></div><div class="pixel" id="cafe"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="cafe"></div><div class="pixel" id="contorno"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div>
    <div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel" id="contorno"></div><div class="pixel" id="cafe"></div><div class="pixel" id="cafe"></div><div class="pixel" id="cafe"></div><div class="pixel" id="contorno"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel" id="contorno"></div><div class="pixel" id="cafe"></div><div class="pixel" id="cafe"></div><div class="pixel" id="cafe"></div><div class="pixel" id="contorno"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div>
    <div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel" id="contorno"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div>
    <div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div><div class="pixel"></div>
    <div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div><div class="pixel" id="verdeuno"></div>
  </div>
<style>:host #caja {
  width: 190px;
  height: 250px;
  background-color: navy;
  margin: auto;
}

:host .pixel {
  width: 10px;
  height: 10px;
  float: left;
  -webkit-animation: color 1.2s infinite alternate;
  -moz-animation: color 1.2s infinite alternate;
  animation: color 1.2s infinite alternate;
}

@-webkit-keyframes color {
  0% {
    -webkit-transform: scale(2.2) rotate(720deg);
  }
}

@-moz-keyframes color {
  0% {
    -moz-transform: scale(2.2) rotate(720deg);
  }
}

@keyframes color {
  0% {
    transform: scale(2.2) rotate(720deg);
  }
}

:host #contorno {
  background-color: black;
}

:host #verdeuno {
  background-color: yellowgreen;
}

:host #verdedos {
  background-color: darkgreen;
}

:host #amarillo {
  background-color: yellow;
}

:host #rosa {
  background-color: pink;
}

:host #roml {
  background-color: orange;
}

:host #onix {
  background-color: white;
}

:host #cafe {
  background-color: brown;
}</style>`;
  }

  querySelector(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  querySelectorAll(selector) {
    return this.shadowRoot.querySelectorAll(selector);
  }

}

customElements.define('minish-link', MinishLink);