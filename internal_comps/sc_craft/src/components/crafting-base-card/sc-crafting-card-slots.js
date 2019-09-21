import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles, APP_COLORS } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCraftingStyles } from '../../entities/sc_crafting-styles.js';

import '../../../../sc_cards/src/components/card-parts/sc-card-ability-value.js';
import './sc-crafting-card-slot-value.js';

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

        .abilities-slots-break {
          width: 100%;
          margin-top: 5px;
          border-bottom: 1px dashed var(${APP_COLORS.HINT_GRAY});
          margin-bottom: 5px;
        }

        .abilities-overview {
          font-size: 16px;
        }

        .slots-overview {
          font-size: 13px;
        }
      </style>
      ${this._craftingCardSlotsHtml()}
    `;
  }

  static get properties() { 
    return {
      card: { type: Object },
      modifiedCard: { type: Object },
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
    let abilityAndSlotBreak = html``;
    let slotsOverviewHtml = html``;
    if (slotsWithAbilities.length) {
      abilitiesOverviewHtml = html`
        <div class="abilities-overview">${LOCALE_EN.SC_CRAFT.CRAFTING_CARD_SLOTS.ABILITY_COUNT(slotsWithAbilities.length)}</div>
      `;
    }
    if (slotsWithAbilities.length && slotsWithoutAbilities.length) {
      abilityAndSlotBreak = html`<div class="abilities-slots-break"></div>`;
    }
    if (slotsWithoutAbilities.length) {
      slotsOverviewHtml = html`
        <div class="slots-overview">${LOCALE_EN.SC_CRAFT.CRAFTING_CARD_SLOTS.SLOT_COUNT(slotsWithoutAbilities.length)}</div>
      `;
    }
    return html`<div class="reduced-overview">${abilitiesOverviewHtml}${abilityAndSlotBreak}${slotsOverviewHtml}</div>`;
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
    if (!this.card.slots || !this.card.slots.length) {
      return html``;
    }
    return this.card.slots.map((slot, index) => {
      if (slot.id || (this.modifiedCard && this.modifiedCard.slots[index].id)) {
        if (this.modifiedCard && this.modifiedCard.slots[index].id) {
          return this._craftingCardFilledSlotHtmlFull(slot, this.modifiedCard.slots[index]);
        }
        return this._craftingCardFilledSlotHtmlFull(slot);
      }
      return this._craftingCardEmptySlotHtmlFull(slot);
    });
  }

  _craftingCardFilledSlotHtmlFull(slot, modifiedSlot) {
    return html`
      <sc-card-ability-value .ability="${slot}" .modifiedAbility="${modifiedSlot}"></sc-card-ability-value>`;
  }

  _craftingCardEmptySlotHtmlFull(slot) {
    return html`
      <sc-crafting-card-slot-value .slot="${slot}"></sc-crafting-card-slot-value>`;
  }
}

window.customElements.define('sc-crafting-card-slots', ScCraftingCardSlots);
