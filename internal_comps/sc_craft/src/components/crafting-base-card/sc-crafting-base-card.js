import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles, CardRarityColor } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCardStyles, CARDS } from '../../../../sc_cards/src/entities/sc_card-styles.js';

import '../../../../sc_cards/src/components/card-parts/sc-card-value.js';
import  { VALUE_TYPES } from '../../../../sc_cards/src/components/card-parts/sc-card-value.js';

import './sc-crafting-card-slots.js';

class ScCraftingBaseCard extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCardStyles}
      <style>
        :host {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          width: calc(var(${CARDS.MINION.WIDTH}) - 2*var(${CARDS.MINION.PADDING}));
          height: calc(var(${CARDS.MINION.HEIGHT}) - 2*var(${CARDS.MINION.PADDING}));
          background-color: var(${CardRarityColor(this.card.rarity)});
          box-shadow: var(${CARDS.MINION.ELEVATION});
          border-radius: var(${CARDS.MINION.BORDER_RADIUS});
          padding: var(${CARDS.MINION.PADDING});
        }

        header,
        footer {
          display: flex;
          align-items: center;
        }

        footer {
          justify-content: center;
        }

        sc-card-value:first-child {
          margin-left: 0px;
        }

        sc-card-value {
          margin-left: 5px;
        }

        [card-title] {
          text-align: center;
        }
      </style>
      <header>
        <sc-card-value valueType="${VALUE_TYPES.COST}" .card="${this.card}" reduced></sc-card-value>
      </header>
      <sc-crafting-card-slots .card="${this.card}" reduced></sc-crafting-card-slots>
      <footer>
        <sc-card-value valueType="${VALUE_TYPES.RANGE}" .card="${this.card}" stack reduced></sc-card-value>
        <sc-card-value valueType="${VALUE_TYPES.ATTACK}" .card="${this.card}" stack reduced></sc-card-value>
        <sc-card-value valueType="${VALUE_TYPES.HEALTH}" .card="${this.card}" stack reduced></sc-card-value>
        <sc-card-value valueType="${VALUE_TYPES.SHIELD}" .card="${this.card}" stack reduced></sc-card-value>
      </footer>
    `;
  }

  static get properties() { 
    return {
      card: { type: Object }
    }
  }
}

window.customElements.define('sc-crafting-base-card', ScCraftingBaseCard);