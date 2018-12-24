import { put, takeEvery, all } from 'redux-saga/effects';
import { ACTION_TYPES, ACTION_TARGET_TYPES } from '../../../sc_shared/src/entities/turn-keywords.js';
import { CARD_TYPES } from '../../../sc_shared/src/entities/card-keywords.js';
import store from './store.js';
import * as CardsSelector from './selectors.js';
import * as CardActions from '../services/card-actions.js';
import * as StatusDispatchActions from '../../../sc_status/src/state/actions.js';
import * as Actions from './actions.js';
import * as GameDispatchActions from '../../../sc_game/src/state/actions.js';
import { Log } from '../../../sc_shared/src/services/logger.js';
import { CARD_TARGETS } from '../entities/selected-card.js';
import * as CardsInterface from '../services/interface/cards.js';

function* _setUpdatedCards() {
  let { cards } = CardsInterface.getCardsUpdatedFromOpponentTurn();
  Actions.setUpdatedCards.success(cards);
}

function* _setCards() {
  let { cards } = CardsInterface.getCards();
  Actions.setCards.success(cards);
}

function* _setPlayerDecks() {
  let { hand, deck, discardPile, lostCards } = CardsInterface.getPlayerDecks();
  Actions.setPlayerDecks.success(hand.cards, hand.refillSize, discardPile.cards, lostCards.cards, deck.size);
}

function* _summonMinion({playAreaIndex}) {
  let { discardedCard, updatedCards} = yield _prepareSummonMinion(playAreaIndex);
  let action = yield _getSummonMinionAction(playAreaIndex);
  yield put(GameDispatchActions.recordAction(action));
  yield put(Actions.summonMinion.success(playAreaIndex, updatedCards, discardedCard));
}

function _prepareSummonMinion(playAreaIndex) {
  const state = store.getState();
  let selectedCard = CardsSelector.getSelectedCard(state);
  let playerFieldCard = CardsSelector.getPlayerFieldSlots(state)[playAreaIndex];
  let discardedCard = {
    id: playerFieldCard.id,
    instance: playerFieldCard.instance,
  };
  let updatedCards = CardActions.summonMinion(selectedCard, playerFieldCard);
  return { discardedCard, updatedCards};
}

function _getSummonMinionAction(playAreaIndex) {
  const state = store.getState();
  let selectedCard = CardsSelector.getSelectedCard(state);
  let playerFieldCard = CardsSelector.getPlayerFieldSlots(state)[playAreaIndex];
  return {
    type: ACTION_TYPES.SUMMON_MINION,
    source: {
      id: selectedCard.id,
      instance: selectedCard.instance,
      handIndex: selectedCard.handIndex,
      playAreaIndex: selectedCard.playAreaIndex
    },
    targets: [
      {
        type: ACTION_TARGET_TYPES.SUMMON_MINION,
        playAreaIndex,
        id: playerFieldCard.id,
        instance: playerFieldCard.instance
      }
    ]
  };
}

function* _attackMinion({playAreaIndex}) {
  let { updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots } = _prepareAttackMinion(playAreaIndex);
  let action = yield _getAttackMinionAction(playAreaIndex);
  yield put(GameDispatchActions.recordAction(action));
  yield put(Actions.attackMinion.success(updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots));
}

function _prepareAttackMinion(playAreaIndex) {
  const state = store.getState();
  let selectedCard = CardsSelector.getSelectedCard(state);
  let playerFieldSlots = CardsSelector.getPlayerFieldSlots(state);
  let opponentFieldSlots = CardsSelector.getOpponentFieldSlots(state);
  let playerFieldCard = playerFieldSlots[selectedCard.playAreaIndex];
  let opponentFieldCard = opponentFieldSlots[playAreaIndex];
  let cards = CardsSelector.getCards(state);
  let addedToDiscardPile = [];
  let { updatedCards, attackerDiscarded, attackedDiscarded } = CardActions.attackMinion(cards, playerFieldCard, opponentFieldCard);
  if (attackerDiscarded) {
    addedToDiscardPile.push({
      id: playerFieldSlots[selectedCard.playAreaIndex].id,
      instance: playerFieldSlots[selectedCard.playAreaIndex].instance
    });
    playerFieldSlots[selectedCard.playAreaIndex] = {
      id: null,
      instance: null
    };
  }
  if (attackedDiscarded) {
    opponentFieldSlots[playAreaIndex] = {
      id: null,
      instance: null
    };
  }
  return { updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots };
}

function _getAttackMinionAction(playAreaIndex) {
  const state = store.getState();
  let selectedCard = CardsSelector.getSelectedCard(state);
  let opponentFieldCard = CardsSelector.getOpponentFieldSlots(state)[playAreaIndex];
  return {
    type: ACTION_TYPES.PLAY_MINION,
    source: {
      id: selectedCard.id,
      instance: selectedCard.instance,
      handIndex: selectedCard.handIndex,
      playAreaIndex: selectedCard.playAreaIndex
    },
    targets: [
      {
        type: ACTION_TARGET_TYPES.ATTACK_MINION,
        playAreaIndex,
        id: opponentFieldCard.id,
        instance: opponentFieldCard.instance
      }
    ]
  };
}

function* _setFieldFromOpponentTurn() {
  let { slots, backlog } = CardsInterface.getOpponentField();
  console.trace('@TODO');
  yield put(Actions.setFieldFromOpponentTurn.success(updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots));
}

function* _clearHand() {
  let addedToDiscardPile = yield _prepareClearHand();
  yield put(Actions.clearHand.success(addedToDiscardPile));
}

function _prepareClearHand() {
  const state = store.getState();
  return CardsSelector.getHandCards(state);
}

function* _refreshPlayerCards() {
  let updatedCards = yield _prepareRefreshPlayerCards();
  yield put(Actions.refreshPlayerCards.success(updatedCards));
}

function _prepareRefreshPlayerCards() {
  const state = store.getState();
  let handCards = CardsSelector.getHandCards(state);
  let playerFieldSlots = CardsSelector.getPlayerFieldSlots(state);
  let refreshReadyCards = [...handCards, ...playerFieldSlots];
  return CardActions.refreshCards(refreshReadyCards);
}

function* _useCardAbility({playAreaIndex}) {
  let { updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots, statusUpdates } = yield _prepareUseCardAbility(playAreaIndex);
  yield _handleStatusUpdates(statusUpdates);
  let action = yield _getUseCardAbilityAction(playAreaIndex);
  yield put(GameDispatchActions.recordAction(action));
  yield put(Actions.useCardAbility.success(updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots));
}

function _prepareUseCardAbility(playAreaIndex) {
  const state = store.getState();
  let selectedAbility = CardsSelector.getSelectedAbility(state);
  let playerFieldSlots = CardsSelector.getPlayerFieldSlots(state);
  let opponentFieldSlots = CardsSelector.getOpponentFieldSlots(state);
  let cards = CardsSelector.getCards(state);
  return CardActions.useCardAbility(cards, playAreaIndex, selectedAbility, playerFieldSlots, opponentFieldSlots);
}

function _handleStatusUpdates(statusUpdates) {
  if (!statusUpdates) {
    return;
  }
  put(StatusDispatchActions.updateStatus(statusUpdates));
}

function _getUseCardAbilityAction(playAreaIndex) {
  const state = store.getState();
  let selectedAbility = CardsSelector.getSelectedAbility(state);
  let opponentFieldCard = CardsSelector.getOpponentFieldSlots(state)[playAreaIndex];
  return {
    type: _getActionTypeOfCard(selectedAbility.card),
    source: {
      id: selectedAbility.id,
      instance: selectedAbility.instance,
      handIndex: selectedAbility.handIndex,
      playAreaIndex: selectedAbility.playAreaIndex
    },
    targets: [
      {
        type: _getTargetTypeOfAbility(selectedAbility),
        playAreaIndex,
        id: opponentFieldCard.id,
        instance: opponentFieldCard.instance,
        abilityId: selectedAbility.abilityId
      }
    ]
  };
}

function _getActionTypeOfCard(card) {
  switch(card.type) {
    case CARD_TYPES.MINION:
      return ACTION_TYPES.PLAY_MINION;
    case CARD_TYPES.SPELL:
      return ACTION_TYPES.CAST_SPELL;
    default:
      Log.error(`Unexpected card type: ${card.type}`);
      return null;
  }
}

function _getTargetTypeOfAbility(selectedAbility) {
  switch(selectedAbility.targets) {
    case CARD_TARGETS.OPPONENT_MINION:
      return ACTION_TARGET_TYPES.ABILITY_TARGET_OPPONENT_MINION;
    case CARD_TARGETS.PLAYER_MINION:
      return ACTION_TARGET_TYPES.ABILITY_TARGET_PLAYER_MINION;
    case CARD_TARGETS.PLAYER:
      return ACTION_TARGET_TYPES.ABILITY_TARGET_PLAYER;
    default:
      Log.error(`Unexpected ability target: ${selectedAbility.targets}`);
      return null;
  }
}

export default function* root() {
  yield all([
    takeEvery(Actions.SUMMON_MINION.REQUEST, _summonMinion),
    takeEvery(Actions.ATTACK_MINION.REQUEST, _attackMinion),
    takeEvery(Actions.SET_FIELD_FROM_OPPONENT_TURN.REQUEST, _setFieldFromOpponentTurn),
    takeEvery(Actions.CLEAR_HAND.REQUEST, _clearHand),
    takeEvery(Actions.REFRESH_PLAYER_CARDS.REQUEST, _refreshPlayerCards),
    takeEvery(Actions.USE_CARD_ABILITY.REQUEST, _useCardAbility),
    takeEvery(Actions.SET_PLAYER_DECKS.REQUEST, _setPlayerDecks),
    takeEvery(Actions.SET_CARDS.REQUEST, _setCards),
    takeEvery(Actions.SET_UPDATED_CARDS.REQUEST, _setUpdatedCards),
  ]);
}