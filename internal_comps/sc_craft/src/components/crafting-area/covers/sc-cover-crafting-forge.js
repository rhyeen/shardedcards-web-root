import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCraftingCardCoverStyle } from './sc-crafting-card-cover-style.js';
import { ScCraftingStyles, CRAFTING_CARDS } from '../../../entities/sc_crafting-styles.js';
import {
  RemoveIcon,
  ForgeIcon,
  ScIconsStyles } from '../../../../../sc_shared/src/entities/sc-icons.js';

class ScCoverCraftingForge extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCraftingCardCoverStyle}
      ${ScCraftingStyles}
      ${ScIconsStyles}
      <style>
        :host {
          border: var(${CRAFTING_CARDS.FORGE_COVER.FORGE_CARD_BORDER});
        }
        [crafting-cover-separator] {
          opacity: ${this._getCardSeparatorOpacity()};
          border-bottom: var(${CRAFTING_CARDS.FORGE_COVER.FORGE_CARD_BORDER});
        }
      </style>
      <div crafting-cover-top>${this._getReplacedResultHtml()}</div>
      <div crafting-cover-separator></div>
      <div crafting-cover-bottom>${this._getReplacerResultHtml()}</div>
    `;
  }

  static get properties() { 
    return {
      card: { type: Object },
      forgeSlot: { type: Object }
    }
  }

  _getCardSeparatorOpacity() {
    return this._noCardToReplace() ? '0' : '1';
  }

  _noCardToReplace() {
    return !this.forgeSlot || !this.forgeSlot.card;
  }

  _getReplacedResultHtml() {
    return this._noCardToReplace() ? html`` : RemoveIcon();
  }

  _getReplacerResultHtml() {
    return this._noCardToReplace() ? html`` : ForgeIcon();
  }
}

window.customElements.define('sc-cover-crafting-forge', ScCoverCraftingForge);