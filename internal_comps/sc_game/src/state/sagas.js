import { put, takeEvery, all, call } from 'redux-saga/effects';
import * as GameInterface from '../services/interface/game.js';
import * as GameSelector from './selectors.js';
import { localStore } from './store.js';
import { Log } from '../../../sc_shared/src/services/logger.js';

import * as Actions from './actions.js';
import * as CardsDispatchActions  from '../../../sc_cards/src/state/actions.js';
import * as StatusDispatchActions  from '../../../sc_status/src/state/actions.js';
import * as CraftingDispatchActions  from '../../../sc_craft/src/state/actions.js';

function* _beginTurn() {
  yield put(CardsDispatchActions.setPlayerDecks.request());
  yield put(CardsDispatchActions.setPlayingField.request());
  yield put(StatusDispatchActions.setPlayerStatus.request());
  yield put(Actions.beginTurn.success());
}

function* _resetGame() {
  yield call(GameInterface.beginGame);
  yield put(CardsDispatchActions.setCards.request());
  yield put(Actions.beginTurn.request());
  yield put(Actions.resetGame.success());
}

function* _beginCrafting() {
  yield put(CraftingDispatchActions.setCraftingBaseCard.request());
  yield put(CraftingDispatchActions.setCraftingParts.request());
  yield put(Actions.beginCrafting.success());
}

function* _endCrafting(turn) {
  try {
    let { opponentTurn, updatedCards } = yield call(GameInterface.endCrafting, turn);
    console.trace('@TODO: update turn history with opponent turn');
    yield put(Actions.endCrafting.success());
    yield put(CardsDispatchActions.setUpdatedCards(updatedCards))
  } catch (e) {
    yield Log.error(`@TODO: unable to endCrafting(): ${e}`);
  }
}

function* _winGame() {
  yield put (Actions.resetGame.request());
  yield put(Actions.winGame.success());
}

function* _loseGame() {
  yield put (Actions.resetGame.request());
  yield put(Actions.loseGame.success());
}

function* _endTurn() {
  yield call(_callEndTurn);
  yield put(Actions.endTurn.success());
  yield put(Actions.beginCrafting.request());
}

function _callEndTurn() {
  const state = localStore.getState();
  let turn = GameSelector.getPendingTurn(state);
  return GameInterface.endTurn(turn);
}

export default function* root() {
  yield all([
    takeEvery(Actions.RESET_GAME.REQUEST, _resetGame),
    takeEvery(Actions.BEGIN_CRAFTING.REQUEST, _beginCrafting),
    takeEvery(Actions.END_CRAFTING.REQUEST, _endCrafting),
    takeEvery(Actions.WIN_GAME.REQUEST, _winGame),
    takeEvery(Actions.LOSE_GAME.REQUEST, _loseGame),
    takeEvery(Actions.END_TURN.REQUEST, _endTurn),
    takeEvery(Actions.BEGIN_TURN.REQUEST, _beginTurn),
  ]);
}