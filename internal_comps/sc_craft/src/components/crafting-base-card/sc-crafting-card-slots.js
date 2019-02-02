import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles, APP_COLORS } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCraftingStyles } from '../../entities/sc_crafting-styles.js';

import { LOCALE_EN } from '../../../../sc_locale/src/entities/en.js';

class ScCraftingCardSlots extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCraftingStyles}
      <style>
        .reduced-overview {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .abilities-overview {
          font-size: 16px;
          padding-bottom: 5px;
          margin-bottom: 5px;
          width: 100%;
          text-align: center;
          border-bottom: 1px dashed var(${APP_COLORS.HINT_GRAY});
        }

        .slots-overview {
          font-size: 13px;
          font-weight: 300;
        }
      </style>
      ${this._craftingCardSlotsHtml()}
    `;
  }

  static get properties() { 
    return {
      card: { type: Object },
      reduced: { type: Boolean }
    }
  }

  _craftingCardSlotsHtml() {
    if (this.reduced) {
      return this._craftingCardSlotsHtmlReduced();
    }
    return this._craftingCardSlotsHtmlFull();
  }

  _craftingCardSlotsHtmlReduced() {
    let { slotsWithAbilities , slotsWithoutAbilities } = this._separateSlotsWithAbilities();
    let abilitiesOverviewHtml = html``;
    let slotsOverviewHtml = html``;
    if (slotsWithAbilities.length) {
      abilitiesOverviewHtml = html`
        <div class="abilities-overview">${LOCALE_EN.SC_CRAFT.CRAFTING_CARD_SLOTS.ABILITY_COUNT(slotsWithAbilities.length)}</div>
      `;
    }
    if (slotsWithoutAbilities.length) {
      slotsOverviewHtml = html`
        <div class="slots-overview">${LOCALE_EN.SC_CRAFT.CRAFTING_CARD_SLOTS.SLOT_COUNT(slotsWithoutAbilities.length)}</div>
      `;
    }
    return html`<div class="reduced-overview">${abilitiesOverviewHtml}${slotsOverviewHtml}</div>`;
  }

  _separateSlotsWithAbilities() {
    let slotsWithAbilities = [];
    let slotsWithoutAbilities = [];
    if (!this.card.slots || !this.card.slots.length) {
      return {slotsWithAbilities, slotsWithoutAbilities};
    }
    for (let slot of this.card.slots) {
      if (slot.id) {
        slotsWithAbilities.push(slot);
      } else {
        slotsWithoutAbilities.push(slot);
      }
    }
    return {slotsWithAbilities, slotsWithoutAbilities};
  }

  _craftingCardSlotsHtmlFull() {
    console.error('@TODO:');
    return html`

    `;
  }
}

window.customElements.define('sc-crafting-card-slots', ScCraftingCardSlots);
