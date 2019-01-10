import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../internal_comps/sc_shared/src/entities/sc-shared-styles.js';

class Sc404 extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      <style>
        :host {
          display: block;
          padding: 40px;
        }
      </style>
      <h1>Nothing behind these curtains.</h1>
      <h2>Lets <a href="/">get back to the fun</a>.</h2>
    `;
  }
}

window.customElements.define('sc-404', Sc404);
