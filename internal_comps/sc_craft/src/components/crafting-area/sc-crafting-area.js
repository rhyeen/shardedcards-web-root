import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCraftingStyles, CRAFTING_AREA } from '../../entities/sc_crafting-styles.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';
import * as CraftingSelector from '../../state/selectors.js';

import './sc-crafting-forge.js';

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
          ?overlay="${this.overlay}"></sc-crafting-forge>
      <sc-crafting-base-card></sc-crafting-base-card>
      <sc-crafting-forge
          .forgeSlot="${this._forgeSlots[1]}"
          ?overlay="${this.overlay}"></sc-crafting-forge>
    `;
  }

  static get properties() { 
    return {
      overlay: { type: Boolean },
      _forgeSlots: { type: Object }
    }
  }

  stateChanged(state) {
    this._forgeSlots = CraftingSelector.getForgeSlots(state);
  }
}

window.customElements.define('sc-crafting-area', ScCraftingArea);