import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles, CardRarityColor } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCardStyles, CARDS } from '../../../../sc_cards/src/entities/sc_card-styles';

import '../../../../sc_cards/src/components/card-parts/sc-card-value.js';
import { VALUE_TYPES } from '../../../../sc_cards/src/components/card-parts/sc-card-value.js';

import '../../../../sc_cards/src/components/card-parts/sc-card-conditions.js';
import '../../../../sc_cards/src/components/card-parts/sc-card-abilities.js';

class ScFullCraftingBaseCard extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCardStyles}
      <style>
        :host {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          width: var(${CARDS.FULL.WIDTH});
          height: var(${CARDS.FULL.HEIGHT});
          background-color: var(${CARDS.FULL.BACKGROUND_COLOR});
          box-shadow: var(${CARDS.FULL.ELEVATION});
          border-radius: var(${CARDS.FULL.BORDER_RADIUS});
          border: var(${CARDS.FULL.BORDER});
          border-color: var(${CardRarityColor(this.card.rarity)});
          padding: var(${CARDS.FULL.PADDING});
        }

        header,
        footer {
          display: flex;
          align-items: center;
        }

        footer {
          justify-content: space-between;
        }

        .footer-left,
        .footer-right {
          display: flex;
          align-items: center;
        }

        sc-card-value:first-child {
          margin-left: 0px;
        }

        sc-card-value {
          margin-left: 10px;
        }

        [card-title] {
          text-align: center;
          margin-left: 10px;
        }

        sc-card-conditions {
          margin-top: 20px;
          display: block;
        }
      </style>
      <header>
        <sc-card-value valueType="${VALUE_TYPES.COST}" .card="${this.card}" .modifiedCard="${this.modifiedCard}"></sc-card-value>
      </header>
      <section>
        <sc-crafting-card-slots .card="${this.card}"></sc-crafting-card-slots>
      </section>
      <footer>
        <div class="footer-left">
          <sc-card-value valueType="${VALUE_TYPES.RANGE}" .card="${this.card}"></sc-card-value>
          <sc-card-value valueType="${VALUE_TYPES.ATTACK}" .card="${this.card}"></sc-card-value>
        </div>
        <div class="footer-right">
          <sc-card-value valueType="${VALUE_TYPES.HEALTH}" .card="${this.card}"></sc-card-value>
        </div>
      </footer>
    `;
  }

  static get properties() { 
    return {
      card: { type: Object },
      modifiedCard: { type: Object }
    }
  }
}

window.customElements.define('sc-full-crafting-base-card', ScFullCraftingBaseCard);
