import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCardStyles } from '../../entities/sc_card-styles.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';

import * as CardsSelector from '../../state/selectors.js';

import './cards/sc-minion-field-card.js';
import './cards/sc-overlay-field-card.js';
import { PLAY_FIELD_OWNER } from '../../entities/play-field-owner.js';
import { Log } from '../../../../sc_shared/src/services/logger.js';

class ScPlayField extends connect(localStore)(LitElement) {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCardStyles}
      <style>
        :host {
          display: flex;
        }
      </style>
      <div class="field-slot-left" field-slot>
        ${this._getFieldCardHtml(0)}
      </div>
      <div ?overlay="${this.overlay}" field-slot-separator></div>
      <div class="field-slot-middle" field-slot>
        ${this._getFieldCardHtml(1)}
      </div>
      <div ?overlay="${this.overlay}" field-slot-separator></div>
      <div class="field-slot-right" field-slot>
        ${this._getFieldCardHtml(2)}
      </div>
    `;
  }

  static get properties() { 
    return {
      overlay: { type: Boolean },
      owner: { type: String },
      _selectedCardWithAbility: { type: Object },
      _fieldSlots: { type: Object }
    }
  }

  stateChanged(state) {
    if (this.overlay) {
      this._selectedCardWithAbility = CardsSelector.getSelectedAbility(state);
    }
    this._fieldSlots = this._getFieldSlots(state);
  }

  _getFieldSlots(state) {
    switch (this.owner) {
      case PLAY_FIELD_OWNER.PLAYER:
        return CardsSelector.getPlayerFieldSlots(state);
      case PLAY_FIELD_OWNER.OPPONENT:
        return CardsSelector.getOpponentFieldSlots(state);
      default:
        Log.error(`Unexpected owner: ${this.owner}`);
        return CardsSelector.getPlayerFieldSlots(state);
    }
  }

  _getFieldCardHtml(playAreaIndex) {
    if (this.overlay) {
      return html`
        <sc-overlay-field-card
          .fieldSlot="${this._fieldSlots[playAreaIndex]}"
          .selectedCardWithAbility="${this._selectedCardWithAbility}"
          .owner="${this.owner}"></sc-overlay-field-card>`;
    }
    return html`
      <sc-minion-field-card
          .fieldSlot="${this._fieldSlots[playAreaIndex]}"
          .owner="${this.owner}"></sc-minion-field-card>`;
  }
}

window.customElements.define('sc-play-field', ScPlayField);