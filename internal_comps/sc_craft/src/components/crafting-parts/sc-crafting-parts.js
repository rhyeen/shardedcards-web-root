import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles, APP_COLORS } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCraftingStyles, CRAFTING_PARTS } from '../../entities/sc_crafting-styles.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';
import * as CraftingSelector from '../../state/selectors.js';

import './sc-crafting-part.js';

import { selectCraftingPart } from '../../state/actions.js';
import { LOCALE_EN } from '../../../../sc_locale/src/entities/en.js';


class ScCraftingParts extends connect(localStore)(LitElement) {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCraftingStyles}
      <style>
        :host {
          /* @TODO: put in variables */
          height: var(${CRAFTING_PARTS.HEIGHT});
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

        sc-crafting-part:last-child {
          margin-bottom: 10px;
        }

        .parts-title {
          color: var(${APP_COLORS.HINT_GRAY});
          font-size: 14px;
          font-weight: 300;
          border-bottom: 1px dashed var(${APP_COLORS.HINT_GRAY});
          padding-bottom: 10px;
        }

        /** Given in LOCALE_EN.SC_CRAFT.CRAFTING_PARTS.FORGE_NOT_EMPTY */
        .dynamic-value {
          font-weight: 700;
        }
      </style>
      <div class="parts-title">${this._getPartsTitle()}</div>
      ${this._craftingParts.map((craftingPart, index) => html`
      <sc-crafting-part
          .craftingPart="${craftingPart}"
          @click="${() => this._selectCraftingPart(index)}"
          ?disabled="${this._emptyForgeSlots}"></sc-crafting-part>
      `)}
    `;
  }

  static get properties() { 
    return {
      _craftingParts: { type: Object },
      _emptyForgeSlots: { type: Boolean }
    }
  }

  _selectCraftingPart(craftingPartIndex) {
    localStore.dispatch(selectCraftingPart(craftingPartIndex));
  }

  _getPartsTitle() {
    if (this._emptyForgeSlots) {
      return html`${LOCALE_EN.SC_CRAFT.CRAFTING_PARTS.FORGE_EMPTY}`;
    }
    // @TODO: have (1) be dynamic.
    return html`${LOCALE_EN.SC_CRAFT.CRAFTING_PARTS.FORGE_NOT_EMPTY(1)}`;
  }

  stateChanged(state) {
    this._emptyForgeSlots = CraftingSelector.emptyForgeSlots(state);
    this._craftingParts = CraftingSelector.getCraftingParts(state);
  }
}

window.customElements.define('sc-crafting-parts', ScCraftingParts);