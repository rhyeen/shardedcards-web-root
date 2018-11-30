const COMPONENT_TAG = 'SR_CARDS';

/**
 * Base structure derived from: 
 * https://github.com/redux-saga/redux-saga/blob/master/examples/real-world/_actions/index.js
 */
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function _createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${COMPONENT_TAG}_${base}_${type}`;
		return acc;
	}, {})
}

function _createRequestRaw(base) {
  return `${COMPONENT_TAG}_${base}`;
}

function _action(type, payload = {}) {
  return {type, ...payload};
}

export const SELECT_CARD_FROM_HAND = _createRequestRaw('SELECT_CARD_FROM_HAND');
export const selectCardFromHand = (handIndex) => _action(SELECT_CARD_FROM_HAND, {handIndex});

export const CANCEL_SELECT_CARD_FROM_HAND = _createRequestRaw('CANCEL_SELECT_CARD_FROM_HAND');
export const cancelSelectCardFromHand = () => _action(CANCEL_SELECT_CARD_FROM_HAND, {});

export const CANCEL_PLAY_SELECTED_SPELL = _createRequestRaw('CANCEL_PLAY_SELECTED_SPELL');
export const cancelPlaySelectedSpell = () => _action(CANCEL_PLAY_SELECTED_SPELL, {});

export const CANCEL_CAST_SPELL = _createRequestRaw('CANCEL_CAST_SPELL');
export const cancelCastSpell = () => _action(CANCEL_CAST_SPELL, {});

export const CANCEL_SELECT_OPPONENT_MINION = _createRequestRaw('CANCEL_SELECT_OPPONENT_MINION');
export const cancelSelectOpponentMinion = () => _action(CANCEL_SELECT_OPPONENT_MINION, {});

export const CANCEL_SELECT_PLAYER_MINION = _createRequestRaw('CANCEL_SELECT_PLAYER_MINION');
export const cancelSelectPlayerMinion = () => _action(CANCEL_SELECT_PLAYER_MINION, {});

export const CANCEL_PLAY_SELECTED_MINION = _createRequestRaw('CANCEL_PLAY_SELECTED_MINION');
export const cancelPlaySelectedMinion = () => _action(CANCEL_PLAY_SELECTED_MINION, {});

export const PLAY_SELECTED_CARD = _createRequestRaw('PLAY_SELECTED_CARD');
export const playSelectedCard = () => _action(PLAY_SELECTED_CARD, {});

export const SUMMON_CARD = _createRequestTypes('SUMMON_CARD');
export const summonCard = {
  request: (playAreaIndex) => _action(SUMMON_CARD.REQUEST, {playAreaIndex}),
  success: (playAreaIndex, updatedCards, discardedCard) => _action(SUMMON_CARD.SUCCESS, {playAreaIndex, updatedCards, discardedCard})
};

export const SELECT_PLAYER_MINION = _createRequestRaw('SELECT_PLAYER_MINION');
export const selectPlayerMinion = (cardId, cardInstance, playAreaIndex) => _action(SELECT_PLAYER_MINION, {cardId, cardInstance, playAreaIndex});

export const SELECT_OPPONENT_MINION = _createRequestRaw('SELECT_OPPONENT_MINION');
export const selectOpponentMinion = (cardId, cardInstance, playAreaIndex) => _action(SELECT_OPPONENT_MINION, {cardId, cardInstance, playAreaIndex});

export const PLAY_PLAYER_MINION = _createRequestRaw('PLAY_PLAYER_MINION');
export const playPlayerMinion = () => _action(PLAY_PLAYER_MINION, {});

export const ATTACK_CARD = _createRequestTypes('ATTACK_CARD');
export const attackCard = {
  request: (playAreaIndex) => _action(ATTACK_CARD.REQUEST, {playAreaIndex}),
  success: (updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots) => _action(ATTACK_CARD.SUCCESS, {updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots})
};

export const SET_FIELD_FROM_OPPONENT_TURN = _createRequestTypes('SET_FIELD_FROM_OPPONENT_TURN');
export const attackCard = {
  request: () => _action(SET_FIELD_FROM_OPPONENT_TURN.REQUEST, {}),
  success: (updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots) => _action(SET_FIELD_FROM_OPPONENT_TURN.SUCCESS, {updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots})
};

export const CLEAR_HAND = _createRequestTypes('CLEAR_HAND');
export const clearHand = {
  request: () => _action(CLEAR_HAND.REQUEST, {}),
  success: (addedToDiscardPile) => _action(CLEAR_HAND.SUCCESS, {addedToDiscardPile})
};

export const SET_PLAYER_DECKS = _createRequestRaw('SET_PLAYER_DECKS');
export const setPlayerDecks = (handCards, discardPileCards, lostPileCards, deckSize) => _action(SET_PLAYER_DECKS, {handCards, discardPileCards, lostPileCards, deckSize});

export const REFRESH_PLAYER_CARDS = _createRequestTypes('REFRESH_PLAYER_CARDS');
export const refreshPlayerCards = {
  request: () => _action(REFRESH_PLAYER_CARDS.REQUEST, {}),
  success: (handCards, playerFieldSlots) => _action(REFRESH_PLAYER_CARDS.SUCCESS, {handCards, playerFieldSlots})
};

export const SET_PLAYER_CARDS = _createRequestRaw('SET_PLAYER_CARDS');
export const setPlayerCards = (cards) => _action(SET_PLAYER_CARDS, {cards});

export const SET_OPPONENT_CARDS = _createRequestRaw('SET_OPPONENT_CARDS');
export const setOpponentCards = (cards) => _action(SET_OPPONENT_CARDS, {cards});

export const SET_OPPONENT_FIELD_SLOTS = _createRequestRaw('SET_OPPONENT_FIELD_SLOTS');
export const setOpponentCards = (opponentFieldSlots) => _action(SET_OPPONENT_FIELD_SLOTS, {opponentFieldSlots});

export const RESET_CARDS = _createRequestRaw('RESET_CARDS');
export const resetCards = () => _action(RESET_CARDS, {});

export const USE_CARD_ABILITY = _createRequestTypes('USE_CARD_ABILITY');
export const useCardAbility = {
  request: () => _action(USE_CARD_ABILITY.REQUEST, {}),
  success: (updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots) => _action(USE_CARD_ABILITY.SUCCESS, {updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots})
};

export const FINISH_SPELL_CARD = _createRequestRaw('FINISH_SPELL_CARD');
export const finishSpellCard = () => _action(FINISH_SPELL_CARD, {});

export const SELECT_OPPONENT_MINION_TARGETED_ABILITY = _createRequestRaw('SELECT_OPPONENT_MINION_TARGETED_ABILITY');
export const selectOpponentMinionTargetedAbility = (abilityId) => _action(SELECT_OPPONENT_MINION_TARGETED_ABILITY, {abilityId});

export const SELECT_PLAYER_MINION_TARGETED_ABILITY = _createRequestRaw('SELECT_PLAYER_MINION_TARGETED_ABILITY');
export const selectPlayerMinionTargetedAbility = (abilityId) => _action(SELECT_PLAYER_MINION_TARGETED_ABILITY, {abilityId});

export const CANCEL_SELECT_OPPONENT_MINION_TARGETED_ABILITY = _createRequestRaw('CANCEL_SELECT_OPPONENT_MINION_TARGETED_ABILITY');
export const cancelSelectOpponentMinionTargetedAbility = () => _action(CANCEL_SELECT_OPPONENT_MINION_TARGETED_ABILITY, {});

export const CANCEL_SELECT_PLAYER_MINION_TARGETED_ABILITY = _createRequestRaw('CANCEL_SELECT_PLAYER_MINION_TARGETED_ABILITY');
export const cancelSelectPlayerMinionTargetedAbility = () => _action(CANCEL_SELECT_PLAYER_MINION_TARGETED_ABILITY, {});
