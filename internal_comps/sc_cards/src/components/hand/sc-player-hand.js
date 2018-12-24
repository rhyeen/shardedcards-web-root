import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCardStyles, CARDS, AREAS } from '../../entities/sc_card-styles.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';

import * as CardSelector from '../../state/selectors.js';
import { selectCardFromHand } from '../../state/actions.js';

class ScPlayerHand extends connect(localStore)(LitElement) {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCardStyles}
      <style>
        :host {
          width: calc(100% - var(${AREAS.PLAYER_HAND.MARGIN}));
          /** @DEBUG: no idea why this is not AREAS.PLAYER_HAND.WIDTH... */
          max-width: var(${CARDS.HAND.WIDTH});
          flex: 0 0 var(${AREAS.PLAYER_HAND.HEIGHT});
        }

        sc-player-hand-card {
          position: absolute;
          /** @DEBUG: no idea why this is not CARDS.HAND.WIDTH... */
          width: calc(100% - 42px); /* @DEBUG: no idea about the 42... */
          transition: height 0.1s, margin-top 0.1s;
          transition-timing-function: ease-in;
        }

        /** @DEBUG: is this still needed? **/
        sc-player-hand-card[active] {
          opacity: 0;
        }

        .hand-card-0 {
          margin-top: 0;
          height: var(${AREAS.PLAYER_HAND.HEIGHT});
        }

        .hand-card-0:hover {
          margin-top: calc(-1*var(${CARDS.HAND.HOVER_RAISE_HEIGHT}));
          height: calc(var(${AREAS.PLAYER_HAND.HEIGHT}) + var(${CARDS.HAND.HOVER_RAISE_HEIGHT}));
        }

        .hand-card-1 {
          margin-top: var(${CARDS.HAND.HEIGHT});
          height: calc(var(${AREAS.PLAYER_HAND.HEIGHT}) - var(${CARDS.HAND.HEIGHT}));
        }

        .hand-card-1:hover {
          margin-top: calc(var(${CARDS.HAND.HEIGHT}) - var(${CARDS.HAND.HOVER_RAISE_HEIGHT}));
          height: calc(var(${AREAS.PLAYER_HAND.HEIGHT}) + var(${CARDS.HAND.HOVER_RAISE_HEIGHT}) - var(${CARDS.HAND.HEIGHT}));
        }

        .hand-card-2 {
          margin-top: calc(2*var(${CARDS.HAND.HEIGHT}));
          height: calc(var(${AREAS.PLAYER_HAND.HEIGHT}) - 2*var(${CARDS.HAND.HEIGHT}));
        }

        .hand-card-2:hover {
          margin-top: calc(2*var(${CARDS.HAND.HEIGHT}) - var(${CARDS.HAND.HOVER_RAISE_HEIGHT}));
          height: calc(var(${AREAS.PLAYER_HAND.HEIGHT}) + var(${CARDS.HAND.HOVER_RAISE_HEIGHT}) - 2*var(${CARDS.HAND.HEIGHT}));
        }

        .hand-card-3 {
          margin-top: calc(3*var(${CARDS.HAND.HEIGHT}));
          height: calc(var(${AREAS.PLAYER_HAND.HEIGHT}) - 3*var(${CARDS.HAND.HEIGHT}));
        }

        .hand-card-3:hover {
          margin-top: calc(3*var(${CARDS.HAND.HEIGHT}) - var(${CARDS.HAND.HOVER_RAISE_HEIGHT}));
          height: calc(var(${AREAS.PLAYER_HAND.HEIGHT}) + var(${CARDS.HAND.HOVER_RAISE_HEIGHT}) - 3*var(${CARDS.HAND.HEIGHT}));
        }

        .hand-card-4 {
          margin-top: calc(4*var(${CARDS.HAND.HEIGHT}));
          height: calc(var(${AREAS.PLAYER_HAND.HEIGHT}) - 4*var(${CARDS.HAND.HEIGHT}));
        }

        .hand-card-4:hover {
          margin-top: calc(4*var(${CARDS.HAND.HEIGHT}) - var(${CARDS.HAND.HOVER_RAISE_HEIGHT}));
          height: calc(var(${AREAS.PLAYER_HAND.HEIGHT}) + var(${CARDS.HAND.HOVER_RAISE_HEIGHT}) - 4*var(${CARDS.HAND.HEIGHT}));
        }
      </style>
      ${this._handCards.map((card, index) => html`
      <sc-player-hand-card
          class="hand-card-${index}"
          .card="${card.card}"
          @click="${() => this._selectCard(index)}"
          ?active="${this._isActiveCard(card)}"></sc-player-hand-card>
      `)}
    `;
  }

  static get properties() { 
    return {
      _selectedCard: { type: Object },
      _handCards: { type: Array }
    }
  }

  _selectCard(index) {
    localStore.dispatch(selectCardFromHand(index));
  }

  _isActiveCard(card) {
    return this._selectedCard.id === card.id && this._selectedCard.instance === card.instance;
  }

  stateChanged(state) {
    this._selectedCard = CardSelector.getSelectedCard(state);
    this._handCards = CardSelector.getHandCards(state);
  }
}

window.customElements.define('sc-player-hand', ScPlayerHand);
