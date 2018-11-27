import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';

import store from '../../state/store.js';

import {
  hideInGameMenu,
  resetGame
} from '../../state/actions/sc_game.js';

import '../../../../sc_shared/src/components/sc-btn.js';

import { BTN_TYPES } from '../../../../sc_shared/src/entities/sc-btn-types.js';

import { LOCALE_EN } from '../../../../sc_locale/src/entities/en.js';

export class ScGameMenuPane extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      <style>
        :host {
          display: flex;
          width: 100%;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        sc-btn:first-child {
          margin-top: 0;
        }

        sc-btn {
          margin-top: 20px;
        }
      </style>
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
    store.dispatch(hideInGameMenu())
  }

  _resetGame() {
    store.dispatch(resetGame.request())
  }
}

window.customElements.define('sc-game-menu-pane', ScGameMenuPane);
