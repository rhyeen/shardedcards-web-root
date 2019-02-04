import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCraftingStyles, CRAFTING_AREA } from '../../entities/sc_crafting-styles.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';
import * as CraftingSelector from '../../state/selectors.js';

import {  
  selectCraftingBaseCard,
  selectForgeSlot,
  finishForgeSelectedCraftingBaseCard } from '../../state/actions.js';

import './sc-crafting-forge.js';
import './covers/sc-cover-crafting-forge.js';
import '../crafting-base-card/sc-crafting-base-card.js';
import './covers/sc-cover-crafting-base-card.js';

class ScCraftingArea extends connect(localStore)(LitElement) {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCraftingStyles}
      <style>
        :host {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
          flex: 1;
          width: calc(100% - 2*(10px));
          max-width: var(${CRAFTING_AREA.MAX_WIDTH});
        }
      </style>
      ${this._getCraftingAreaHtml()}
    `;
  }

  static get properties() { 
    return {
      overlay: { type: Boolean },
      _forgeSlots: { type: Object },
      _craftingBaseCard: { type: Object },
      _loaded: { type: Boolean },
      _isForgingCraftingBaseCard: { type: Boolean }
    }
  }

  _getCraftingAreaHtml() {
    if (this._isLoading()) {
      return html``;
    }
    return html`
      ${this._getCraftingForgeHtml(0)}
      ${this._getCraftingBaseCardHtml()}
      ${this._getCraftingForgeHtml(1)}
    `;
  }

  _isLoading() {
    if (!!this._craftingBaseCard) {
      this._loaded = true;
    }
    return !this._loaded;
  }

  stateChanged(state) {
    this._forgeSlots = CraftingSelector.getForgeSlots(state);
    this._craftingBaseCard = CraftingSelector.getCraftingBaseCard(state);
    this._isForgingCraftingBaseCard = CraftingSelector.isForgingCraftingBaseCard(state);
  }

  _selectCraftingBaseCard() {
    localStore.dispatch(selectCraftingBaseCard());
  }

  _selectForgeSlot(forgeSlotIndex) {
    if (this._isForgingCraftingBaseCard) {
      localStore.dispatch(finishForgeSelectedCraftingBaseCard(forgeSlotIndex));
    } else {
      localStore.dispatch(selectForgeSlot(forgeSlotIndex));
    }
  }

  _getCraftingForgeHtml(forgeSlotIndex) {
    if (!this.overlay) {
      return html`
        <sc-crafting-forge
            .forgeSlot="${this._forgeSlots[forgeSlotIndex]}"
            @click="${() => this._selectForgeSlot(forgeSlotIndex)}"></sc-crafting-forge>
      `;
    }
    if (this._isForgingCraftingBaseCard) {
      return html`
        <sc-cover-crafting-forge
            .card="${this._craftingBaseCard}"
            .forgeSlot="${this._forgeSlots[forgeSlotIndex]}"
            @click="${() => this._selectForgeSlot(forgeSlotIndex)}"></sc-cover-crafting-forge>
      `;
    }
    console.error('@TODO: state for adding a crafting part to a forge slot');
  }

  _getCraftingBaseCardHtml() {
    if (!this.overlay) {
      return html`
        <sc-crafting-base-card
            .card="${this._craftingBaseCard}"
            @click="${() => this._selectCraftingBaseCard()}"></sc-crafting-base-card>
      `;
    }
    return html`
      <sc-cover-crafting-base-card></sc-cover-crafting-base-card>
    `;
  }
}

window.customElements.define('sc-crafting-area', ScCraftingArea);