import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScOverlaySharedStyle } from './sc-overlay-shared-style.js';

import { localStore } from '../../state/store.js';

import {
  forgeSelectedCraftingBaseCard,
  cancelSelectCraftingBaseCard
} from '../../../../sc_craft/src/state/actions.js';

import '../../../../sc_shared/src/components/sc-btn.js';
import '../../../../sc_craft/src/components/crafting-base-card/sc-full-crafting-base-card.js';

import { BTN_TYPES } from '../../../../sc_shared/src/entities/sc-btn-types.js';
import { LOCALE_EN } from '../../../../sc_locale/src/entities/en.js';

export class ScSelectCraftingBaseCardOverlay extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScOverlaySharedStyle}
      <sc-full-crafting-base-card .card="${this.craftingBaseCard}"></sc-full-crafting-base-card>
      <div btn-group>
        <sc-btn
            .btntype="${BTN_TYPES.PRESET.CANCEL}"
            @click="${() => this._cancel()}">
          ${LOCALE_EN.SC_BTN.PRESET.CANCEL}</sc-btn>
        <sc-btn
            .btntype="${BTN_TYPES.GENERIC.PRIMARY}"
            @click="${() => this._forgeCard()}">
          ${LOCALE_EN.SC_BTN.OTHER.FORGE_CARD}</sc-btn>
      </div>
    `
  }

  static get properties() { 
    return {
      craftingBaseCard: { type: Object }
    };
  }

  _cancel() {
    localStore.dispatch(cancelSelectCraftingBaseCard());
  }

  _forgeCard() {
    localStore.dispatch(forgeSelectedCraftingBaseCard());
  }
}

window.customElements.define('sc-select-crafting-base-card-overlay', ScSelectCraftingBaseCardOverlay);
