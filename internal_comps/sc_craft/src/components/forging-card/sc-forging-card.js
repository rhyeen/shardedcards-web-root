import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles, CardRarityColor } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCardStyles, CARDS } from '../../../../sc_cards/src/entities/sc_card-styles.js';

import '../../../../sc_cards/src/components/card-parts/sc-card-value.js';
import  { VALUE_TYPES } from '../../../../sc_cards/src/components/card-parts/sc-card-value.js';

import '../crafting-base-card/sc-crafting-card-slots.js';
import { FORGE } from '../../entities/sc_crafting-styles.js';

class ScForgingCard extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCardStyles}
      <style>
        .forging-card {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          width: calc(var(${CARDS.MINION.WIDTH}) - 2*var(${CARDS.MINION.PADDING}));
          height: calc(var(${CARDS.MINION.HEIGHT}) - 2*var(${CARDS.MINION.PADDING}));
          background-color: var(${CardRarityColor(this.forgeSlot.card.rarity)});
          box-shadow: var(${CARDS.MINION.ELEVATION});
          border-radius: var(${CARDS.MINION.BORDER_RADIUS});
          padding: var(${CARDS.MINION.PADDING});
          margin-left: var(${FORGE.PADDING});
          margin-top: var(${FORGE.PADDING});
        }

        .forging-card header,
        .forging-card footer {
          display: flex;
          align-items: center;
        }

        .forging-card footer {
          justify-content: center;
        }

        .forging-card sc-card-value:first-child {
          margin-left: 0px;
        }

        .forging-card sc-card-value {
          margin-left: 5px;
        }

        .forging-card [card-title] {
          text-align: center;
        }

        sc-empty-forge {
          position: absolute;
          z-index: -1;
          display: block;
        }
      </style>
      <sc-empty-forge></sc-empty-forge>
      <div class="forging-card">
        <header>
          <sc-card-value valueType="${VALUE_TYPES.COST}" .card="${this.forgeSlot.card}" reduced></sc-card-value>
        </header>
        <sc-crafting-card-slots .card="${this.forgeSlot.card}" reduced></sc-crafting-card-slots>
        <footer>
          <sc-card-value valueType="${VALUE_TYPES.RANGE}" .card="${this.forgeSlot.card}" stack reduced></sc-card-value>
          <sc-card-value valueType="${VALUE_TYPES.ATTACK}" .card="${this.forgeSlot.card}" stack reduced></sc-card-value>
          <sc-card-value valueType="${VALUE_TYPES.HEALTH}" .card="${this.forgeSlot.card}" stack reduced></sc-card-value>
          <sc-card-value valueType="${VALUE_TYPES.SHIELD}" .card="${this.forgeSlot.card}" stack reduced></sc-card-value>
        </footer>
      </div>
    `;
  }

  static get properties() { 
    return {
      forgeSlot: { type: Object }
    }
  }
}

window.customElements.define('sc-forging-card', ScForgingCard);