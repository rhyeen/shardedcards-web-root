import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCraftingCardCoverStyle } from './sc-crafting-card-cover-style.js';
import { ScCraftingStyles, CRAFTING_CARDS } from '../../../entities/sc_crafting-styles.js';

class ScCoverCraftingBaseCard extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCraftingStyles}
      ${ScCraftingCardCoverStyle}
      <style>
        :host {
          width: var(${CRAFTING_CARDS.CRAFTING_BASE_CARD_COVER.WIDTH});
          height: var(${CRAFTING_CARDS.CRAFTING_BASE_CARD_COVER.HEIGHT});
          padding: var(${CRAFTING_CARDS.CRAFTING_BASE_CARD_COVER.PADDING});
        }

        [crafting-cover-separator] {
          opacity: 0;
        }
      </style>
      <div crafting-cover-top></div>
      <div crafting-cover-separator></div>
      <div crafting-cover-bottom></div>
    `;
  }
}

window.customElements.define('sc-cover-crafting-base-card', ScCoverCraftingBaseCard);