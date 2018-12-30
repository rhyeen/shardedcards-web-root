import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScOverlaySharedStyle } from './sc-overlay-shared-style.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';

import {
  playSelectedCard,
  cancelSelectCardFromHand
} from '../../../../sc_cards/src/state/actions.js';

import '../../../../sc_shared/src/components/sc-btn.js';
import '../../../../sc_cards/src/components/selected-card/sc-full-card.js';

import { BTN_TYPES } from '../../../../sc_shared/src/entities/sc-btn-types.js';
import { LOCALE_EN } from '../../../../sc_locale/src/entities/en.js';

import * as StatusSelector from '../../../../sc_status/src/state/selectors.js';

export class ScFullHandCardOverlay extends connect(localStore)(LitElement) {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScOverlaySharedStyle}
      <sc-full-card
          .card="${this.selectedCard.card}"></sc-full-card>
      <div btn-group>
        <sc-btn
            .btntype="${BTN_TYPES.PRESET.CANCEL}"
            @click="${() => this._cancel()}">
          ${LOCALE_EN.SC_BTN.PRESET.CANCEL}</sc-btn>
        <sc-btn
            .btntype="${BTN_TYPES.GENERIC.PRIMARY}"
            @click="${() => this._playCard()}"
            ?disabled="${!this._canAffordCard()}">
          ${LOCALE_EN.SC_BTN.OTHER.PLAY_CARD}</sc-btn>
      </div>
    `
  }

  static get properties() { 
    return {
      selectedCard: { type: Object },
      _currentEnergy: { type: Number }
    };
  }

  _cancel() {
    localStore.dispatch(cancelSelectCardFromHand());
  }

  _playCard() {
    localStore.dispatch(playSelectedCard());
  }

  stateChanged(state) {
    this._currentEnergy = StatusSelector.getCurrentEnergy(state);
  }

  _canAffordCard() {
    return this.selectedCard.card.cost <= this._currentEnergy;
  }
}

window.customElements.define('sc-full-hand-card-overlay', ScFullHandCardOverlay);
