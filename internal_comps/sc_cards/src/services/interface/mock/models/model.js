import { getInitialCards } from './initial-cards.js';
import { getInitialOpponentCards } from './initial-opponent-cards.js';
import { getInitialDeck } from './initial-deck.js';

export const Model = _getInitialModel();

function _getInitialModel() {
  return {
    cards: {},
    player: {
      hand: {
        cards: [],
        refillSize: 5
      },
      deck: {
        cards: []
      },
      discardPile: {
        cards: []
      },
      lostCards: {
        cards: []
      },
      field: {
        slots: [
          {
            id: null,
            instance: null
          },
          {
            id: null,
            instance: null
          },
          {
            id: null,
            instance: null
          }
        ]
      }
    },
    opponent: {
      field: { // @DEBUG: should probably be field: [ { backlog, slot }] instead
        backlog: [
          {
            cards: []
          },
          {
            cards: []
          },
          {
            cards: []
          }
        ],
        slots: [
          {
            id: null,
            instance: null
          },
          {
            id: null,
            instance: null
          },
          {
            id: null,
            instance: null
          }
        ]
      }
    }
  };
}

export function initializeModel() {
  let model = _getInitialModel();
  Model.cards = { ...getInitialCards(), ...getInitialOpponentCards() };
  Model.player = model.player;
  Model.player.deck.cards = getInitialDeck();
  Model.opponent = model.opponent;
}

export function removeCardFromHand(handIndex) {
  Model.player.hand.cards.splice(handIndex, 1);
}
