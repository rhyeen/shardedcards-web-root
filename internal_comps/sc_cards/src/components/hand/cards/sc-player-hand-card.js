import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles, CardRarityColor } from '../../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCardStyles, CARDS } from '../../../entities/sc_card-styles.js';

import '../../card-parts/sc-card-value.js';
import { VALUE_TYPES } from '../../card-parts/sc-card-value.js';

class ScPlayerHandCard extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCardStyles}
      <style>
        :host {
          display: flex;
          justify-content: space-between;
          align-items: top;
          max-width: calc(var(${CARDS.HAND.WIDTH}) - 2*var(${CARDS.HAND.PADDING}));
          line-height: var(${CARDS.HAND.HEIGHT});
          background-color: var(${CardRarityColor(this.card.rarity)});
          box-shadow: var(${CARDS.HAND.ELEVATION});
          border-top-left-radius: var(${CARDS.HAND.BORDER_RADIUS});
          border-top-right-radius: var(${CARDS.HAND.BORDER_RADIUS});
          padding: 0 var(${CARDS.HAND.PADDING});
        }

        header,
        footer {
          height: var(${CARDS.HAND.HEIGHT});
          display: flex;
          align-items: center;
        }

        sc-card-value:first-child {
          margin-left: 0px;
        }

        sc-card-value {
          margin-left: 5px;
        }

        [card-title] {
          margin-left: 10px;
        }
      </style>
      <header>
        <sc-card-value valueType="${VALUE_TYPES.COST}" .card="${this.card}" reduced></sc-card-value>
        <div card-title>${this.card.title}</div>
      </header>
      <footer>
        <sc-card-value valueType="${VALUE_TYPES.RANGE}" .card="${this.card}" reduced></sc-card-value>
        <sc-card-value valueType="${VALUE_TYPES.ATTACK}" .card="${this.card}" reduced></sc-card-value>
        <sc-card-value valueType="${VALUE_TYPES.HEALTH}" .card="${this.card}" reduced></sc-card-value>
      </footer>
    `;
  }

  static get properties() { 
    return {
      card: { type: Object }
    }
  }
}

window.customElements.define('sc-player-hand-card', ScPlayerHandCard);
