import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCraftingStyles, CRAFTING_AREA } from '../../entities/sc_crafting-styles.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';
import * as CraftingSelector from '../../state/selectors.js';

import './sc-crafting-part.js';

import { selectCraftingPart } from '../../state/actions.js';


class ScCraftingParts extends connect(localStore)(LitElement) {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCraftingStyles}
      <style>
        :host {
          /* @TODO: put in variables */
          padding: 10px 0;
          height: 240px; /* just some number */
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: flex-end;
        }

        sc-crafting-part:first-child {
          margin-top: 0;
        }

        sc-crafting-part {
          margin-top: 10px;
        }
      </style>
      ${this._craftingParts.map((craftingPart, index) => html`
      <sc-crafting-part
          .craftingPart="${craftingPart}"
          @click="${() => this._selectCraftingPart(index)}"></sc-crafting-part>
      `)}
    `;
  }

  static get properties() { 
    return {
      _craftingParts: { type: Object }
    }
  }

  _selectCraftingPart(craftingPartIndex) {
    localStore.dispatch(selectCraftingPart(craftingPartIndex));
  }

  stateChanged(state) {
    this._craftingParts = CraftingSelector.getCraftingParts(state);
  }
}

window.customElements.define('sc-crafting-parts', ScCraftingParts);