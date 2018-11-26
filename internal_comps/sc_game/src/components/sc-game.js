import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../sc_shared/src/entities/sc-shared-styles.js';

import './game-area/sc-game-footer.js';
import './game-area/sc-game-header.js';
import './game-area/sc-game-overlay.js';
import './game-area/sc-game-view.js';

class ScGame extends LitElement {
  render() {
    return html`
      <style>
        :host {
          height: 100vh;
          width: 100vw;
        }
      </style>
      ${ScSharedStyles}

      <sc-game-view></sc-game-view>
      <sc-game-header></sc-game-header>
      <sc-game-footer></sc-game-footer>
      <sc-game-overlay></sc-game-overlay>
    `;
  }
}

window.customElements.define('sc-game', ScGame);
