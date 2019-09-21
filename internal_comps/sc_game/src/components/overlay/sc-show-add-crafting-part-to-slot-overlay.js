import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScOverlaySharedStyle } from './sc-overlay-shared-style.js';

import { localStore } from '../../state/store.js';

import {
  finishAddCraftingPart,
  cancelAddCraftingPart
} from '../../../../sc_craft/src/state/actions.js';

import '../../../../sc_shared/src/components/sc-btn.js';
import '../../../../sc_craft/src/components/crafting-base-card/sc-full-crafting-base-card.js';

import { BTN_TYPES } from '../../../../sc_shared/src/entities/sc-btn-types.js';
import { LOCALE_EN } from '../../../../sc_locale/src/entities/en.js';
import { getCardWithAddedCraftingPart } from '../../../../sc_craft/src/services/card-modifier.js';

export class ScShowAddCraftingPartToSlotOverlay extends LitElement {
  render() {
    this._setModifiedCard();
    return html`
      ${ScSharedStyles}
      ${ScOverlaySharedStyle}
      <sc-full-crafting-base-card .card="${this.forgeSlot.card}" .modifiedCard="${this._modifiedCard}"></sc-full-crafting-base-card>
      <div btn-group>
        <sc-btn
            .btntype="${BTN_TYPES.PRESET.BACK}"
            @click="${() => this._back()}">
          ${LOCALE_EN.SC_BTN.PRESET.BACK}</sc-btn>
        <sc-btn
            .btntype="${BTN_TYPES.GENERIC.PRIMARY}"
            @click="${() => this._addPart()}" ?disabled=${!this._modifiedCard}>
          ${LOCALE_EN.SC_BTN.OTHER.ADD_PART}</sc-btn>
      </div>
    `
  }

  static get properties() { 
    return {
      forgeSlot: { type: Object },
      craftingPart: { type: Object },
      _modifiedCard: { type: Object }
    };
  }

  _setModifiedCard() {
    const { modifiedCard, cardWasModified } = getCardWithAddedCraftingPart(this.forgeSlot.card, this.craftingPart);
    if (cardWasModified) {
      this._modifiedCard = modifiedCard;
    } else {
      this._modifiedCard = null;
    }
  }

  _back() {
    localStore.dispatch(cancelAddCraftingPart());
  }

  _addPart() {
    localStore.dispatch(finishAddCraftingPart.request());
  }
}

window.customElements.define('sc-show-add-crafting-part-to-slot-overlay', ScShowAddCraftingPartToSlotOverlay);
