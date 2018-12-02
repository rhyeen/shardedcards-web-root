import * as ActionType from './actions.js';
import * as Cards from '../services/card-selection.js';

import { CARD_TYPES } from '../../../sc_shared/src/entities/card-keywords.js';
import { CARD_SOURCES, CARD_TARGETS } from '../entities/selected-card.js';

const INITIAL_STATE = _resetState();

function _resetState() {
  return {
    ui: {
      selectedCard: {
        source: null,
        id: null,
        instance: null,
        handIndex: null,
        playAreaIndex: null
      },
      selectedAbility: {
        targets: null,
        abilityId: null
      }
    },
    entities: {
      cards: {},
      player: {
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
}

function _setPlayerCards(state, cards) {
  return {
    ...state,
    entities: {
      ...state.entities,
      cards: {
        ...state.entities.cards,
        ...cards
      }
    }
  }
}

function _setOpponentCards(state, cards) {
  return {
    ...state,
    entities: {
      ...state.entities,
      cards: {
        ...state.entities.cards,
        ...cards
      }
    }
  }
}

function _setPlayerDeckSize(state, deckSize) {
  return {
    ...state,
    entities: {
      ...state.entities,
      player: {
        ...state.entities.player,
        deck: {
          ...state.entities.player.deck,
          size: deckSize
        }
      }
    }
  };
}

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

function _setSelectedAbility(state, targets, abilityId) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedAbility: {
        targets: targets,
        abilityId: abilityId
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

function _removeSelectedAbility(state) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedAbility: {
        targets: null,
        abilityId: null
      }
    }
  };
}

function _setCard(state, card, cardId, cardInstance) {
  let newState = _shallowCopyPlayerCardInstances(state, cardId);
  newState.entities.cards[cardId].instances[cardInstance] = card;
}

function _shallowCopyPlayerCardInstances(state, cardId) {
  let newState = _shallowCopyPlayerCards(state);
  newState.entities.cards[cardId] = {
    ...newState.entities.cards[cardId],
    instances: {
      ...newState.entities.cards[cardId].instances
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

function _discardCard(state, cardId, cardInstance) {
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

function _setPlayerFieldSlots(state, playerFieldSlots) {
  let newState = _shallowCopyPlayerFieldSlots(state);
  for (let i = 0; i < 3; i++) {
    newState.entities.player.field.slots[i] = {
      id: playerFieldSlots[i].id,
      instance: playerFieldSlots[i].instance
    };
  }
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

function _setOpponentFieldSlots(state, opponentFieldSlots) {
  let newState = _shallowCopyOpponentFieldSlots(state);
  for (let i = 0; i < 3; i++) {
    newState.entities.opponent.field.slots[i] = {
      id: opponentFieldSlots[i].id,
      instance: opponentFieldSlots[i].instance
    };
  }
}

function _setOpponentFieldBacklog(state, opponentFieldBacklog) {
  let newState = _shallowCopyOpponentFieldBacklog(state);
  for (let i = 0; i < 3; i++) {
    newState.entities.opponent.field.backlog[i] = {
      size: opponentFieldBacklog[i].size
    };
  }
}

function _shallowCopyOpponentFieldSlots(state) {
  return {
    ...state,
    entities: {
      ...state.entities,
      opponent: {
        ...state.entities.opponent,
        field: {
          ...state.entities.field,
          slots: [...state.entities.field.slots]
        }
      }
    }
  };
}

function _shallowCopyOpponentFieldBacklog(state) {
  return {
    ...state,
    entities: {
      ...state.entities,
      opponent: {
        ...state.entities.opponent,
        field: {
          ...state.entities.field,
          backlog: [...state.entities.field.backlog]
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
      return _setSelectedCard(state, CARD_SOURCES.SELECT_PLAYER_HAND, action.cardId, action.cardInstance, action.handIndex, null);
    case ActionType.CANCEL_SELECT_CARD_FROM_HAND:
    case ActionType.CANCEL_PLAY_SELECTED_SPELL:
    case ActionType.CANCEL_CAST_SPELL: // CANCEL_CASTING_CARD for spell only
      handIndex = state.ui.selectedCard.handIndex;
      cardId = state.ui.selectedCard.id;
      cardInstance = state.ui.selectedCard.instance;
      newState = _addHandCard(state, handIndex, cardId, cardInstance);
      return _removeSelectedCard(newState);
    case ActionType.CANCEL_SELECT_OPPONENT_MINION:    
    case ActionType.CANCEL_SELECT_PLAYER_MINION:
    case ActionType.CANCEL_PLAY_SELECTED_MINION:
      return _removeSelectedCard(newState);
    case ActionType.PLAY_SELECTED_CARD:
      card = Cards.getCard(state.entities.cards, state.ui.selectedCard.id, state.ui.selectedCard.instance);
      switch (card.type) {
        case CARD_TYPES.MINION:
          return _setSelectedCardSource(state, CARD_SOURCES.SUMMON_PLAYER_MINION);
        case CARD_TYPES.SPELL:
          return _setSelectedCardSource(state, CARD_SOURCES.CAST_PLAYER_SPELL);
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
      if (action.discardedCard) {
        newState = _discardCard(newState, action.discardedCard.id, action.discardedCard.instance);
      }
      newState = _setPlayerFieldSlot(newState, action.playAreaIndex, cardId, cardInstance);
      return _removeSelectedCard(newState);
    case ActionType.SELECT_PLAYER_MINION:
      return _setSelectedCard(state, CARD_SOURCES.SELECT_PLAYER_MINION, action.cardId, action.cardInstance, null, action.playAreaIndex);
    case ActionType.SELECT_OPPONENT_MINION:
      return _setSelectedCard(state, CARD_SOURCES.SELECT_OPPONENT_MINION, action.cardId, action.cardInstance, null, action.playAreaIndex);
    case ActionType.PLAY_PLAYER_MINION:
      return _setSelectedCardSource(CARD_SOURCES.PLAY_PLAYER_MINION);
    case ActionType.ATTACK_CARD.SUCCESS:
    case ActionType.SET_FIELD_FROM_OPPONENT_TURN.SUCCESS:
      newState = state;
      for (let updatedCard of action.updatedCards) {
        newState = _setCard(newState, updatedCard.card, updatedCard.id, updatedCard.instance);
      }
      for (let discardedCard of action.addedToDiscardPile) {
        newState = _discardCard(newState, discardedCard.id, discardedCard.instance);
      }
      newState = _setPlayerFieldSlots(newState, action.playerFieldSlots);
      newState = _setOpponentFieldSlots(newState, action.opponentFieldSlots);
      return _removeSelectedCard(newState);
    case ActionType.CLEAR_HAND.SUCCESS:
      newState = state;
      newState = _setHandCards(newState, []);
      for (let discardedCard of action.addedToDiscardPile) {
        newState = _discardCard(newState, discardedCard.id, discardedCard.instance);
      }
      return _setPlayerDeckSize(newState, action.deckSize);
    case ActionType.SET_PLAYER_DECKS: // SET_HAND
      newState = state;
      newState = _setHandCards(newState, action.handCards);
      newState = _setDiscardedPileCards(newState, action.discardPileCards);
      newState = _setLostPileCards(newState, aciton.lostPileCards);
      return _setPlayerDeckSize(newState, action.deckSize);
    case ActionType.REFRESH_PLAYER_CARDS.SUCCESS:
      newState = state;
      newState = _setHandCards(newState, action.handCards);
      return _setPlayerFieldSlots(newState, action.playerFieldSlots);
    case ActionType.SET_PLAYER_CARDS:
      return _setPlayerCards(state, action.cards);
    case ActionType.SET_OPPONENT_CARDS:
      return _setOpponentCards(state, action.cards);
    case ActionType.SET_OPPONENT_FIELD_SLOTS:
      return _setOpponentFieldSlots(state, action.opponentFieldSlots);
    case ActionType.SET_OPPONENT_FIELD_BACKLOG:
      return _setOpponentFieldBacklog(state, action.opponentFieldBacklog);
    case ActionType.RESET_CARDS:
      return _resetState();
    case ActionType.USE_CARD_ABILITY.SUCCESS: // USE_CARD_ABILITY + CAST_AGAINST_TARGET + APPLY_CAST_AGAINST_OPPONENT_TARGET + APPLY_CAST_AGAINST_UNIT_TARGET
      newState = state;
      for (let updatedCard of action.updatedCards) {
        newState = _setCard(newState, updatedCard.card, updatedCard.id, updatedCard.instance);
      }
      for (let discardedCard of action.addedToDiscardPile) {
        newState = _discardCard(newState, discardedCard.id, discardedCard.instance);
      }
      newState = _setPlayerFieldSlots(newState, action.playerFieldSlots);
      newState = _setOpponentFieldSlots(newState, action.opponentFieldSlots);
      return _removeSelectedAbility(newState);
    case ActionType.FINISH_SPELL_CARD: // FINISH_CASTING_CARD
      cardId = state.ui.selectedCard.id;
      cardInstance = state.ui.selectedCard.instance;  
      newState = _discardCard(state, cardId, cardInstance);
      return _removeSelectedCard(newState);
    case ActionType.SELECT_OPPONENT_MINION_TARGETED_ABILITY: // CAST_OPPONENT_TARGET_ABILITY
      return _setSelectedAbility(state, CARD_TARGETS.OPPONENT_MINION, action.abilityId);
    case ActionType.SELECT_PLAYER_MINION_TARGETED_ABILITY: // CAST_UNIT_TARGET_ABILITY
      return _setSelectedAbility(state, CARD_TARGETS.PLAYER_MINION, action.abilityId);
    case ActionType.CANCEL_SELECT_OPPONENT_MINION_TARGETED_ABILITY:
    case ActionType.CANCEL_SELECT_PLAYER_MINION_TARGETED_ABILITY:
      return _removeSelectedAbility(newState);
    default:
      return state;
  }
};
