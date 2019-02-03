import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCraftingStyles } from '../../entities/sc_crafting-styles.js';

import { ScIconsStyles, EmptySlotIcon } from '../../../../sc_shared/src/entities/sc-icons.js';
import { LOCALE_EN } from '../../../../sc_locale/src/entities/en.js';

class ScCraftingCardSlotValue extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCraftingStyles}
      ${ScIconsStyles}
      <div card-slot>
        <div class="icon">${EmptySlotIcon()}</div>
        <div class="tooltip">
          <div class="tooltip-title">${LOCALE_EN.SC_CRAFT.CRAFTING_CARD_SLOT_VALUE.TITLE}</div>
          <div class="tooltip-description">${LOCALE_EN.SC_CRAFT.CRAFTING_CARD_SLOT_VALUE.DESCRIPTION}</div>
        </div>
      </div>
    `;
  }

  static get properties() { 
    return {
      slot: { type: Object }
    }
  }
}

window.customElements.define('sc-crafting-card-slot-value', ScCraftingCardSlotValue);
