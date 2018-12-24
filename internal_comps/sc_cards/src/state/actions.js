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

export const SUMMON_MINION = _createRequestTypes('SUMMON_MINION');
export const summonMinion = {
  request: (playAreaIndex) => _action(SUMMON_MINION.REQUEST, {playAreaIndex}),
  success: (playAreaIndex, updatedCards, discardedCard) => _action(SUMMON_MINION.SUCCESS, {playAreaIndex, updatedCards, discardedCard})
};

export const SELECT_PLAYER_MINION = _createRequestRaw('SELECT_PLAYER_MINION');
export const selectPlayerMinion = (cardId, cardInstance, playAreaIndex) => _action(SELECT_PLAYER_MINION, {cardId, cardInstance, playAreaIndex});

export const SELECT_OPPONENT_MINION = _createRequestRaw('SELECT_OPPONENT_MINION');
export const selectOpponentMinion = (cardId, cardInstance, playAreaIndex) => _action(SELECT_OPPONENT_MINION, {cardId, cardInstance, playAreaIndex});

export const PLAY_PLAYER_MINION = _createRequestRaw('PLAY_PLAYER_MINION');
export const playPlayerMinion = () => _action(PLAY_PLAYER_MINION, {});

export const ATTACK_MINION = _createRequestTypes('ATTACK_MINION');
export const attackMinion = {
  request: (playAreaIndex) => _action(ATTACK_MINION.REQUEST, {playAreaIndex}),
  success: (updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots) => _action(ATTACK_MINION.SUCCESS, {updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots})
};

export const SET_PLAYING_FIELD = _createRequestTypes('SET_PLAYING_FIELD');
export const setPlayingField = {
  request: () => _action(SET_PLAYING_FIELD.REQUEST, {}),
  success: (opponentFieldSlots, opponentFieldBacklog, playerFieldSlots) => _action(SET_PLAYING_FIELD.SUCCESS, {opponentFieldSlots, opponentFieldBacklog, playerFieldSlots})
};

export const CLEAR_HAND = _createRequestTypes('CLEAR_HAND');
export const clearHand = {
  request: () => _action(CLEAR_HAND.REQUEST, {}),
  success: (addedToDiscardPile) => _action(CLEAR_HAND.SUCCESS, {addedToDiscardPile})
};

export const SET_PLAYER_DECKS = _createRequestTypes('SET_PLAYER_DECKS');
export const setPlayerDecks = {
  request: () => _action(SET_PLAYER_DECKS.REQUEST, {}),
  success: (handCards, handRefillSize, discardPileCards, lostPileCards, deckSize) => _action(SET_PLAYER_DECKS, {handCards, handRefillSize, discardPileCards, lostPileCards, deckSize})
};

export const REFRESH_PLAYER_CARDS = _createRequestTypes('REFRESH_PLAYER_CARDS');
export const refreshPlayerCards = {
  request: () => _action(REFRESH_PLAYER_CARDS.REQUEST, {}),
  success: (updatedCards) => _action(REFRESH_PLAYER_CARDS.SUCCESS, {updatedCards})
};

export const SET_UPDATED_CARDS = _createRequestTypes('SET_UPDATED_CARDS');
export const setUpdatedCards = {
  request: () => _action(SET_UPDATED_CARDS.REQUEST, {}),
  success: (updatedCards) => _action(SET_UPDATED_CARDS.SUCCESS, {updatedCards})
};

export const SET_CARDS = _createRequestTypes('SET_CARDS');
export const setCards = {
  request: () => _action(SET_CARDS.REQUEST, {}),
  success: (cards) => _action(SET_CARDS.SUCCESS, {cards})
};

export const RESET_CARDS = _createRequestRaw('RESET_CARDS');
export const resetCards = () => _action(RESET_CARDS, {});

export const USE_CARD_ABILITY = _createRequestTypes('USE_CARD_ABILITY');
export const useCardAbility = {
  request: (playAreaIndex) => _action(USE_CARD_ABILITY.REQUEST, {playAreaIndex}),
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
