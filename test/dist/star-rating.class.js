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

  dispatchEvent(event) {
    return this.shadowRoot.dispatchEvent(event);
  }

}

customElements.define('star-rating', StarRating);