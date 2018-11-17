import { LitElement, html } from '@polymer/lit-element';
import { SharedStyles } from '../../../sc_shared-styles/shared-styles.js';

class ScGame extends LitElement {
  render() {
    return html`
      ${SharedStyles}
      <div>GAME</div>
    `;
  }
}

window.customElements.define('sc-game', ScGame);
