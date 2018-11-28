import * as ActionType from './actions.js';
import * as CardAction from '../services/card-actions.js';
import * as Cards from '../services/card-selection.js';

import { CARD_TYPES } from '../../../sc_shared/src/entities/card-keywords.js';
import { CARD_SOURCES } from '../entities/selected-card.js';

const INITIAL_STATE = {
  ui: {
    selectedCard: {
      source: null,
      id: null,
      instance: null,
      handIndex: null,
      playAreaIndex: null
    },
    selectedAbility: {
      target: null,
      id: null,
      instance: null,
      abilityId: null,
      handIndex: null,
      playAreaIndex: null
    }
  },
  entities: {
    player: {
      cards: {},
      hand: {
        cards: [],
        refillSize: 5
      },
      deck: {
        size: 0
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
            size: 0
          },
          {
            size: 0
          },
          {
            size: 0
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
  }
};

function _removeHandCard(state, handIndex) {
  let newState = _shallowCopyHandCards(state);
  newState.entities.player.hand.cards.splice(handIndex, 1);
  return newState;
}

function _addHandCard(state, handIndex, cardId, cardInstance) {
  let newState = _shallowCopyHandCards(state);
  newState.entities.player.hand.cards.splice(handIndex, 1, {
    id: cardId,
    instance: cardInstance
  });
  return newState;
}

function _shallowCopyHandCards(state) {
  return {
    ...state,
    entities: {
      ...state.entities,
      player: {
        ...state.entities.player,
        hand: {
          ...state.entities.hand,
          cards: [...state.entities.hand.cards]
        }
      }
    }
  };
}

function _setSelectedCard(state, source, cardId, cardInstance, handIndex, playAreaIndex) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedCard: {
        source: source,
        id: cardId,
        instance: cardInstance,
        handIndex: handIndex,
        playAreaIndex: playAreaIndex
      }
    }
  };
}

function _setSelectedCardSource(state, source) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedCard: {
        ...state.ui.selectedCard,
        source: source
      }
    }
  };
}

function _removeSelectedCard(state) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedCard: {
        source: null,
        id: null,
        instance: null,
        handIndex: null,
        playAreaIndex: null
      }
    }
  };
}

function _setCard(state, card, cardId, cardInstance) {
  let newState = _shallowCopyPlayerCardInstances(state, cardId);
  newState.entities.player.cards[cardId].instances[cardInstance] = card;
}

function _shallowCopyPlayerCardInstances(state, cardId) {
  let newState = _shallowCopyPlayerCards(state);
  newState.entities.player.cards[cardId] = {
    ...newState.entities.player.cards[cardId],
    instances: {
      ...newState.entities.player.cards[cardId].instances
    }
  }
  return newState;
}

function _shallowCopyPlayerCards(state) {
  return {
    ...state,
    entities: {
      ...state.entities,
      player: {
        ...state.entities.player,
        cards: {
          ...state.entities.cards,
        }
      }
    }
  };
}

function _addDiscardCard(state, cardId, cardInstance) {
  let newState = _shallowCopyDiscardCards(state);
  newState.entities.player.hand.cards.push({
    id: cardId,
    instance: cardInstance
  });
  return newState;
}

function _shallowCopyDiscardCards(state) {
  return {
    ...state,
    entities: {
      ...state.entities,
      player: {
        ...state.entities.player,
        discardPile: {
          ...state.entities.discardPile,
          cards: [...state.entities.discardPile.cards]
        }
      }
    }
  };
}

function _setPlayerFieldSlot(state, playAreaIndex, cardId, cardInstance) {
  let newState = _shallowCopyPlayerFieldSlots(state);
  newState.entities.player.field.slots[playAreaIndex] = {
    id: cardId,
    instance: cardInstance
  };
  return newState;
}

function _shallowCopyPlayerFieldSlots(state) {
  return {
    ...state,
    entities: {
      ...state.entities,
      player: {
        ...state.entities.player,
        field: {
          ...state.entities.field,
          slots: [...state.entities.field.slots]
        }
      }
    }
  };
}

export const sc_cards = (state = INITIAL_STATE, action) => {
  let newState, handIndex, cardId, cardInstance, card;
  switch (action.type) {
    case ActionType.SELECT_CARD_FROM_HAND:
      newState = _removeHandCard(state, action.handIndex);
      return _setSelectedCard(state, CARD_SOURCES.HAND, action.cardId, action.cardInstance, action.handIndex, null);
    case ActionType.CANCEL_SELECT_CARD_FROM_HAND:
    case ActionType.CANCEL_PLAY_SELECTED_CARD:
      handIndex = state.ui.selectedCard.handIndex;
      cardId = state.ui.selectedCard.id;
      cardInstance = state.ui.selectedCard.instance;
      newState = _addHandCard(state, handIndex, cardId, cardInstance);
      return _removeSelectedCard(newState);
    case ActionType.PLAY_SELECTED_CARD:
      card = Cards.getCard(state.entities.player.cards, state.ui.selectedCard.id, state.ui.selectedCard.instance);
      switch (card.type) {
        case CARD_TYPES.SUMMON:
          return _setSelectedCardSource(state, CARD_SOURCES.PLAY_SUMMON);
        case CARD_TYPES.CAST:
          return _setSelectedCardSource(state, CARD_SOURCES.PLAY_CAST);
        default:
          console.error(`unexpected card type: ${card.type}`)
          return state
      }
    case ActionType.SUMMON_CARD.SUCCESS:
      cardId = state.ui.selectedCard.id;
      cardInstance = state.ui.selectedCard.instance;
      newState = state;
      // for example, if the placed card got shield from replacing a card.
      for (let updatedCard of action.updatedCards) {
        newState = _setCard(newState, updatedCard.card, updatedCard.id, updatedCard.instance);
      }
      if (discardedCard) {
        newState = _addDiscardCard(newState, discardedCard.id, discardedCard.instance);
      }
      newState = _setPlayerFieldSlot(newState, action.playAreaIndex, cardId, cardInstance);
      return _removeSelectedCard(newState);
    default:
      return state;
  }
};
