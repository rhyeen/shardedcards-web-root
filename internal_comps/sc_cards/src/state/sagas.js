import { put, takeEvery, all } from 'redux-saga/effects';

import store from './store.js';
import * as CardsSelector from './selectors.js';
import * as CardActions from '../services/card-actions.js';

import * as Actions from './actions.js';

function* _summonCard({playAreaIndex}) {
  const state = store.getState();
  let selectedCard = CardsSelector.getSelectedCard(state);
  let playerFieldCard = CardsSelector.getPlayerFieldSlots(state)[playAreaIndex];
  let discardedCard = {
    id: playerFieldCard.id,
    instance: playerFieldCard.instance,
  };
  let updatedCards = CardActions.summonCard(selectedCard, playerFieldCard);
  yield put(Actions.summonCard.success(playAreaIndex, updatedCards, discardedCard));
}

function* _attackCard({playAreaIndex}) {
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
  yield put(Actions.attackCard.success(updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots));
}

function* _setFieldFromOpponentTurn() {
  console.error(`Go get opponent's turn`);
  yield put(Actions.setFieldFromOpponentTurn.success(updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots));
}

function* _clearHand() {
  const state = store.getState();
  yield put(Actions.clearHand.success(CardsSelector.getHandCards(state)));
}

function* _refreshPlayerCards() {
  const state = store.getState();
  let handCards = CardsSelector.getHandCards(state);
  let playerFieldSlots = CardsSelector.getPlayerFieldSlots(state);
  let refreshReadyCards = [...handCards, ...playerFieldSlots];
  let updatedCards = CardActions.refreshCards(refreshReadyCards);
  yield put(Actions.refreshPlayerCards.success(updatedCards));
}

function* _useCardAbility({playAreaIndex}) {
  const state = store.getState();
  let selectedAbility = CardsSelector.getSelectedAbility(state);
  let playerFieldSlots = CardsSelector.getPlayerFieldSlots(state);
  let opponentFieldSlots = CardsSelector.getOpponentFieldSlots(state);
  let { updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots } = CardActions.useCardAbility(playAreaIndex, selectedAbility, playerFieldSlots, opponentFieldSlots);
  yield put(Actions.useCardAbility.success(updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots));
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