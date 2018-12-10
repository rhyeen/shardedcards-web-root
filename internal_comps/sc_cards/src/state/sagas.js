import { put, takeEvery, all } from 'redux-saga/effects';

import store from './store.js';
import * as CardsSelector from './selectors.js';
import * as CardActions from '../services/card-actions.js';

import * as Actions from './actions.js';

function* _summonCard({playAreaIndex}) {
  let { discardedCard, updatedCards} = yield _prepareSummonCard(playAreaIndex);
  yield put(Actions.summonCard.success(playAreaIndex, updatedCards, discardedCard));
}

function _prepareSummonCard(playAreaIndex) {
  const state = store.getState();
  let selectedCard = CardsSelector.getSelectedCard(state);
  let playerFieldCard = CardsSelector.getPlayerFieldSlots(state)[playAreaIndex];
  let discardedCard = {
    id: playerFieldCard.id,
    instance: playerFieldCard.instance,
  };
  let updatedCards = CardActions.summonCard(selectedCard, playerFieldCard);
  return { discardedCard, updatedCards};
}

function* _attackCard({playAreaIndex}) {
  let { updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots } = _prepareAttackCard(playAreaIndex);
  yield put(Actions.attackCard.success(updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots));
}

function _prepareAttackCard(playAreaIndex) {
  const state = store.getState();
  let selectedCard = CardsSelector.getSelectedCard(state);
  let playerFieldSlots = CardsSelector.getPlayerFieldSlots(state);
  let opponentFieldSlots = CardsSelector.getOpponentFieldSlots(state);
  let playerFieldCard = playerFieldSlots[selectedCard.playAreaIndex];
  let opponentFieldCard = opponentFieldSlots[playAreaIndex];
  let cards = CardsSelector.getCards(state);
  let { updatedCards, attackerDiscarded, attackedDiscarded } = CardActions.attackCard(cards, playerFieldCard, opponentFieldCard);
  if (attackerDiscarded) {
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

function* _setFieldFromOpponentTurn() {
  yield console.trace(`@TODO: Go get opponent's turn`);
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
  let { updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots } = yield _prepareUseCardAbility(playAreaIndex);
  yield put(Actions.useCardAbility.success(updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots));
}

function _prepareUseCardAbility(playAreaIndex) {
  const state = store.getState();
  let selectedAbility = CardsSelector.getSelectedAbility(state);
  let playerFieldSlots = CardsSelector.getPlayerFieldSlots(state);
  let opponentFieldSlots = CardsSelector.getOpponentFieldSlots(state);
  return CardActions.useCardAbility(playAreaIndex, selectedAbility, playerFieldSlots, opponentFieldSlots);
}

export default function* root() {
  yield all([
    takeEvery(Actions.SUMMON_CARD.REQUEST, _summonCard),
    takeEvery(Actions.ATTACK_CARD.REQUEST, _attackCard),
    takeEvery(Actions.SET_FIELD_FROM_OPPONENT_TURN.REQUEST, _setFieldFromOpponentTurn),
    takeEvery(Actions.CLEAR_HAND.REQUEST, _clearHand),
    takeEvery(Actions.REFRESH_PLAYER_CARDS.REQUEST, _refreshPlayerCards),
    takeEvery(Actions.USE_CARD_ABILITY.REQUEST, _useCardAbility)
  ]);
}