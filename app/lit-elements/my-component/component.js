import { LitElement, html, css } from 'lit-element';
import 'wired-button';

class Component extends LitElement {
  static get properties() {
    return {
      greeting: { type: String },
      counter: { type: Number }
    };
  }

  constructor() {
    super();
    this.greeting = 'Hola mundo';
    this.counter = 0;
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

      p {
        margin-top: 0;
      }
    `;
  }

  render() {
    return html`
      <h1>${this.greeting}</h1>
      <p>Times clicked: ${this.counter}</p>
      <wired-button @click=${this._increaseCounter}>Click me!</wired-button>
    `;
  }

  _increaseCounter() {
    this.counter++;
  }
}

customElements.define('my-component', Component);
