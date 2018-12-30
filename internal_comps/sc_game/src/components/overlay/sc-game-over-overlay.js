import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScOverlaySharedStyle } from './sc-overlay-shared-style.js';

import { localStore } from '../../state/store.js';
import { resetGame } from '../../state/actions.js';

import '../../../../sc_shared/src/components/sc-btn.js';

import { BTN_TYPES } from '../../../../sc_shared/src/entities/sc-btn-types.js';
import { LOCALE_EN } from '../../../../sc_locale/src/entities/en.js';
import { Log } from '../../../../sc_shared/src/services/logger.js';

export const END_GAME_STATE = {
  WON: 'won',
  LOST: 'lost'
};

export class ScGameOverOverlay extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScOverlaySharedStyle}
      <div>${this._endGameTextHtml()}</div>
      <sc-btn
          .btntype="${BTN_TYPES.GENERIC.WARNING}"
          @click="${() => this._resetGame()}">
        ${LOCALE_EN.SC_BTN.OTHER.RESET_GAME}</sc-btn>
    `
  }

  static get properties() { 
    return {
      endGameState: { type: String }
    }
  }

  _endGameTextHtml() {
    switch (this.endGameState) {
      case END_GAME_STATE.WON:
        return LOCALE_EN.SC_BTN.OTHER.GAME_WON;
      case END_GAME_STATE.LOST:
        return LOCALE_EN.SC_BTN.OTHER.GAME_LOST;
      default:
        return Log.error(`Unexpected endGameState: ${this.endGameState}`);
    }
  }

  _resetGame() {
    localStore.dispatch(resetGame.request());
  }
}

window.customElements.define('sc-game-over-overlay', ScGameOverOverlay);
