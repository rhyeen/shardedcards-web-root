import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCraftingCardCoverStyle } from './sc-crafting-card-cover-style.js';
import { ScCraftingStyles, CRAFTING_CARDS } from '../../../entities/sc_crafting-styles.js';
import {
  RemoveIcon,
  ForgeIcon,
  ScIconsStyles } from '../../../../../sc_shared/src/entities/sc-icons.js';
import { CRAFTING_PART_TYPES } from '../../../entities/crafting-part.js';
import { Ability, CardStat } from '../../../../../sc_cards/src/entities/selected-card.js';
import { BTN_COLORS } from '../../../../../sc_shared/src/components/sc-btn-base-style.js';

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
          width: var(${CRAFTING_CARDS.FORGE_COVER.WIDTH});
          height: var(${CRAFTING_CARDS.FORGE_COVER.HEIGHT});
        }
        [crafting-cover-separator] {
          opacity: ${this._getCardSeparatorOpacity()};
          border-bottom: var(${CRAFTING_CARDS.FORGE_COVER.FORGE_CARD_BORDER});
        }

        .basic-svg-icon {
          fill: var(${BTN_COLORS.LIGHT_BTN_TEXT_COLOR}) !important;
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
      forgeSlot: { type: Object },
      craftingPart: { type: Object }
    }
  }

  _getCardSeparatorOpacity() {
    return this._noCardToReplace() ? '0' : '1';
  }

  _noCardToReplace() {
    return !this.forgeSlot || !this.forgeSlot.card;
  }

  _getReplacedResultHtml() {
    if (this.craftingPart) {
      return ForgeIcon();
    }
    return this._noCardToReplace() ? html`` : RemoveIcon();
  }

  _getReplacerResultHtml() {
    if (this.craftingPart) {
      return this._getCraftingPartIcon();
    }
    return this._noCardToReplace() ? html`` : ForgeIcon();
  }

  _getCraftingPartIcon() {
    switch (this.craftingPart.type) {
      case CRAFTING_PART_TYPES.ABILITY:
        return html`${Ability.getIcon(this.craftingPart.ability.id, 'basic-svg-icon')}`;
      case CRAFTING_PART_TYPES.STAT:
        return html`${CardStat.getIcon(this.craftingPart.stat.id, 'basic-svg-icon')}`;
      default:
        Log.error(`unexpected crafting part type: ${this.craftingPart.type}`);
        return html``;
    }
  }
}

window.customElements.define('sc-cover-crafting-forge', ScCoverCraftingForge);