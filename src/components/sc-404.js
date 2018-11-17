import { LitElement, html } from '@polymer/lit-element';
import { SharedStyles } from '../../internal_comps/sc_shared-styles/shared-styles.js';

class Sc404 extends LitElement {
  render() {
    return html`
      ${SharedStyles}
      <h1>Nothing behind these curtains.</h1>
      <h2>Lets <a href="/">get back to the fun</a>.</h2>
    `;
  }
}

window.customElements.define('sc-404', Sc404);
