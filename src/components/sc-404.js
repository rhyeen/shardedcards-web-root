import { LitElement, html } from '@polymer/lit-element';
import { SharedStyles } from '../../internal_comps/sc_shared-styles/shared-styles.js';

class Sc404 extends LitElement {
  render() {
    return html`
      ${SharedStyles}
      <div>PAGE NOT FOUND</div>
    `;
  }
}

window.customElements.define('sc-404', Sc404);
