import { getInitialCards } from './initial-cards.js';
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
      field: {
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
  Model.player.deck = getInitialDeck();
  Model.opponent = model.opponent;
}
