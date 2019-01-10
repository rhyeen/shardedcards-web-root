import { getInitialCards } from './initial-cards.js';
import { getInitialOpponentCards } from './initial-opponent-cards.js';
import { getInitialDeck } from './initial-deck.js';
import { Log } from '../../../../../../sc_shared/src/services/logger.js';
import * as Cards from '../../../card-selection.js';

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

export const DEBUG = {
  playerFieldCards: () => {
    let result = [
      _getCardContextFromReference(Model.player.field.slots[0]),
      _getCardContextFromReference(Model.player.field.slots[1]),
      _getCardContextFromReference(Model.player.field.slots[2])
    ];
    Log.debug('playerFieldCards:');
    Log.debug(result);
  },
  opponentFieldCards: () => {
    let result = [
      _getCardContextFromReference(Model.opponent.field.slots[0]),
      _getCardContextFromReference(Model.opponent.field.slots[1]),
      _getCardContextFromReference(Model.opponent.field.slots[2])
    ];
    Log.debug('opponentFieldCards:');
    Log.debug(result);
  },
  handCards: () => {
    let result = [];
    for (let handReference of Model.player.hand.cards) {
      result.push(_getCardContextFromReference(handReference));
    }
    Log.debug('handCards:');
    Log.debug(result);
  }
};

function _getCardContextFromReference(cardReference) {
  return {
    id: cardReference.id,
    instance: cardReference.instance,
    card: Cards.getCard(Model.cards, cardReference.id, cardReference.instance)
  };
}