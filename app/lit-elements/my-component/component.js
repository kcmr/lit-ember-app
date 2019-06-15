import { LitElement, html, css } from 'lit-element';
import 'wired-button';

class Component extends LitElement {
  static get properties() {
    return {
      greeting: { type: String },
      counter: { type: Number },
      otra: { type: String },
      imgSrc: { type: String, attribute: 'img-src' }
    };
  }

  constructor() {
    super();
    this.greeting = 'Hello World';
    this.counter = 0;
    this.otra = `I'm a second paragraph`;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: sans-serif;
        outline: 1px solid #ccc;
        padding: 20px;
        text-align: center;
      }

      h1 {
        font-size: 26px;
      }

      img {
        width: 200px;
      }
    `;
  }

  render() {
    return html`
      <h1>${this.greeting}</h1>
      <img src="${this.imgSrc}" alt="">
      <p>Times clicked: ${this.counter}</p>
      <wired-button @click=${this._increaseCounter}>Click me!</wired-button>
      <p>${this.otra}</p>
    `;
  }

  _increaseCounter() {
    this.counter++;
  }
}

customElements.define('my-component', Component);
