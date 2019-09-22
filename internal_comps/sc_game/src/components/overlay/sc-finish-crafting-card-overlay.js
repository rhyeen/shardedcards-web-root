import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScOverlaySharedStyle } from './sc-overlay-shared-style.js';

import { localStore } from '../../state/store.js';

import {
  addCraftedCardToDeck
} from '../../../../sc_craft/src/state/actions.js';

import '../../../../sc_shared/src/components/sc-btn.js';
import '../../../../sc_cards/src/components/selected-card/sc-full-card.js';

import { BTN_TYPES } from '../../../../sc_shared/src/entities/sc-btn-types.js';
import { LOCALE_EN } from '../../../../sc_locale/src/entities/en.js';
import { CARD_RARITIES } from '../../../../sc_shared/src/entities/card-keywords.js';
import { Log } from '../../../../sc_shared/src/services/logger.js';

export class ScFinishCraftingCardOverlay extends LitElement {
  render() {
    if (!this._maxNumberOfInstances && this.card) {
      this._instantiateNumberOfInstances();
    }
    return html`
      ${ScSharedStyles}
      ${ScOverlaySharedStyle}
      <sc-full-card .card="${this.card}"></sc-full-card>
      <div btn-group class="btn-group-tight">
        <sc-btn
            .btntype="${BTN_TYPES.GENERIC.PRIMARY}"
            @click="${() => this._decrementNumberOfInstances()}" ?disabled=${this._numberOfInstances <= 1}>-</sc-btn>
        <sc-btn
            .btntype="${BTN_TYPES.GENERIC.PRIMARY}"
            @click="${() => this._addToDeck()}">
          ${LOCALE_EN.SC_BTN.OTHER.ADD_CARDS_TO_DECK(this._numberOfInstances)}</sc-btn>
        <sc-btn
            .btntype="${BTN_TYPES.GENERIC.PRIMARY}"
            @click="${() => this._incrementNumberOfInstances()}" ?disabled=${this._numberOfInstances >= this._maxNumberOfInstances}>+</sc-btn>
      </div>
    `
  }

  static get properties() { 
    return {
      card: { type: Object },
      _numberOfInstances: { type: Number },
      _maxNumberOfInstances: { type: Number }
    };
  }
  
  _instantiateNumberOfInstances() {
    this._maxNumberOfInstances = this._getMaxNumberOfInstances();
    if (!this._numberOfInstances) {
      this._numberOfInstances = this._maxNumberOfInstances;
    }
  }

  _addToDeck() {
    localStore.dispatch(addCraftedCardToDeck.request(this._numberOfInstances));
  }

  _decrementNumberOfInstances() {
    this._numberOfInstances--;
  }

  _incrementNumberOfInstances() {
    this._numberOfInstances++;
  }

  _getMaxNumberOfInstances() {
    switch (this.card.rarity) {
      case CARD_RARITIES.COMMON:
        return 5;
      case CARD_RARITIES.RARE:
        return 3;
      case CARD_RARITIES.EPIC:
        return 2;
      case CARD_RARITIES.LEGENDARY:
        return 1;
      default:
        Log.error(`unexpected rarity: ${this.card.rarity}`);
        return 1;
    }
  }
}

window.customElements.define('sc-finish-crafting-card-overlay', ScFinishCraftingCardOverlay);
