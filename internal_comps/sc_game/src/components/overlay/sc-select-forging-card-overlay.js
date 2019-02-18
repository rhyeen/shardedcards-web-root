import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScOverlaySharedStyle } from './sc-overlay-shared-style.js';

import { localStore } from '../../state/store.js';

import {
  finishForgingCard,
  cancelSelectForgeSlot
} from '../../../../sc_craft/src/state/actions.js';

import '../../../../sc_shared/src/components/sc-btn.js';
import '../../../../sc_craft/src/components/crafting-base-card/sc-full-crafting-base-card.js';

import { BTN_TYPES } from '../../../../sc_shared/src/entities/sc-btn-types.js';
import { LOCALE_EN } from '../../../../sc_locale/src/entities/en.js';

export class ScSelectForgingCardOverlay extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScOverlaySharedStyle}
      <sc-full-crafting-base-card .card="${this.card}"></sc-full-crafting-base-card>
      <div btn-group>
        <sc-btn
            .btntype="${BTN_TYPES.PRESET.BACK}"
            @click="${() => this._back()}">
          ${LOCALE_EN.SC_BTN.PRESET.BACK}</sc-btn>
        <sc-btn
            .btntype="${BTN_TYPES.GENERIC.PRIMARY}"
            @click="${() => this._finishForge()}">
          ${LOCALE_EN.SC_BTN.OTHER.FINISH_FORGE}</sc-btn>
      </div>
    `
  }

  static get properties() { 
    return {
      card: { type: Object }
    };
  }

  _back() {
    localStore.dispatch(cancelSelectForgeSlot());
  }

  _finishForge() {
    localStore.dispatch(finishForgingCard.request());
  }
}

window.customElements.define('sc-select-forging-card-overlay', ScSelectForgingCardOverlay);
