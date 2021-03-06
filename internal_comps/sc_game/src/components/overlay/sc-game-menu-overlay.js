import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScOverlaySharedStyle } from './sc-overlay-shared-style.js';

import { localStore } from '../../state/store.js';

import {
  hideInGameMenu,
  resetGame
} from '../../state/actions.js';

import '../../../../sc_shared/src/components/sc-btn.js';

import { BTN_TYPES } from '../../../../sc_shared/src/entities/sc-btn-types.js';
import { LOCALE_EN } from '../../../../sc_locale/src/entities/en.js';

export class ScGameMenuOverlay extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScOverlaySharedStyle}
      <sc-btn
          .btntype="${BTN_TYPES.GENERIC.WARNING}"
          @click="${() => this._resetGame()}">
        ${LOCALE_EN.SC_BTN.OTHER.RESET_GAME}</sc-btn>
      <sc-btn
          .btntype="${BTN_TYPES.PRESET.BACK}"
          @click="${() => this._cancel()}">
        ${LOCALE_EN.SC_BTN.PRESET.BACK}</sc-btn>
    `
  }

  _cancel() {
    localStore.dispatch(hideInGameMenu());
  }

  _resetGame() {
    localStore.dispatch(resetGame.request());
  }
}

window.customElements.define('sc-game-menu-overlay', ScGameMenuOverlay);
