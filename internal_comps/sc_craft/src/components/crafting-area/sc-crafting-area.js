import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCraftingStyles, CRAFTING_AREA } from '../../entities/sc_crafting-styles.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';
import * as CraftingSelector from '../../state/selectors.js';

import {  
  selectCraftingBaseCard,
  selectForgeSlot } from '../../state/actions.js';

import './sc-crafting-forge.js';
import '../crafting-base-card/sc-crafting-base-card.js';

class ScCraftingArea extends connect(localStore)(LitElement) {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCraftingStyles}
      <style>
        :host {
          display: flex;
          justify-content: space-between;
          flex: 1;
          width: 100%;
          max-width: var(${CRAFTING_AREA.MAX_WIDTH});
        }
      </style>
      <sc-crafting-forge
          .forgeSlot="${this._forgeSlots[0]}"
          ?overlay="${this.overlay}"
          @click="${() => this._selectForgeSlot(0)}"></sc-crafting-forge>
      <sc-crafting-base-card
          .card="${this._craftingBaseCard}"
          ?overlay="${this.overlay}"
          @click="${() => this._selectCraftingBaseCard()}"></sc-crafting-base-card>
      <sc-crafting-forge
          .forgeSlot="${this._forgeSlots[1]}"
          ?overlay="${this.overlay}"
          @click="${() => this._selectForgeSlot(1)}"></sc-crafting-forge>
    `;
  }

  static get properties() { 
    return {
      overlay: { type: Boolean },
      _forgeSlots: { type: Object },
      _craftingBaseCard: { type: Object }
    }
  }

  stateChanged(state) {
    this._forgeSlots = CraftingSelector.getForgeSlots(state);
    this._craftingBaseCard = CraftingSelector.getCraftingBaseCard(state);
  }

  _selectCraftingBaseCard() {
    localStore.dispatch(selectCraftingBaseCard());
  }

  _selectForgeSlot(forgeSlotIndex) {
    localStore.dispatch(selectForgeSlot(forgeSlotIndex));
  }
}

window.customElements.define('sc-crafting-area', ScCraftingArea);