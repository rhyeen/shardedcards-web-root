import { put, takeEvery, all } from 'redux-saga/effects';
import * as GameInterface from '../services/interface/game.js';
import * as GameSelector from './selectors.js';

import * as Actions from './actions.js';
import * as CardsDispatchActions  from '../../../sc_cards/src/state/actions.js';
import * as StatusDispatchActions  from '../../../sc_status/src/state/actions.js';

function* _beginTurn() {
  yield put(CardsDispatchActions.setPlayerDecks.request());
  yield put(CardsDispatchActions.setFieldFromOpponentTurn.request());
  yield put(StatusDispatchActions.setPlayerStatus.request());
  yield put(Actions.beginTurn.success());
}

function* _resetGame() {
  yield _callBeginGame();
  yield put(CardsDispatchActions.setCards.request());
  yield put(Actions.beginTurn.request());
  yield put(Actions.resetGame.success());
}

function _callBeginGame() {
  GameInterface.beginGame();
}

function* _startCrafting() {
  yield put(Actions.startCrafting.success());
}

function* _finishCrafting() {
  yield put(Actions.finishCrafting.success());
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
  yield _callEndTurn();
  yield put(Actions.endTurn.success());
  yield put(Actions.startCrafting.request());
}

function _callEndTurn() {
  const state = store.getState();
  let turn = GameSelector.getPendingTurn(state);
  GameInterface.endTurn(turn);
}

export default function* root() {
  yield all([
    takeEvery(Actions.RESET_GAME.REQUEST, _resetGame),
    takeEvery(Actions.START_CRAFTING.REQUEST, _startCrafting),
    takeEvery(Actions.FINISH_CRAFTING.REQUEST, _finishCrafting),
    takeEvery(Actions.WIN_GAME.REQUEST, _winGame),
    takeEvery(Actions.LOSE_GAME.REQUEST, _loseGame),
    takeEvery(Actions.END_TURN.REQUEST, _endTurn),
    takeEvery(Actions.BEGIN_TURN.REQUEST, _beginTurn),
  ]);
}