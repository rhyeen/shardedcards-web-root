import { put, takeEvery, all } from 'redux-saga/effects';

import * as Actions from '../actions/sc_cards.js';

// function* _resetGame() {
//   yield put(Actions.resetGame.success());
// }

// function* _startCrafting() {
//   yield put(Actions.startCrafting.success());
// }

// function* _finishCrafting() {
//   yield put(Actions.finishCrafting.success());
// }

// function* _winGame() {
//   yield put(Actions.winGame.success());
// }

// function* _loseGame() {
//   yield put(Actions.loseGame.success());
// }

// function* _endTurn() {
//   yield put(Actions.startCrafting.request());
// }

export default function* root() {
  yield all([
    // takeEvery(Actions.RESET_GAME.REQUEST, _resetGame),
    // takeEvery(Actions.START_CRAFTING.REQUEST, _startCrafting),
    // takeEvery(Actions.FINISH_CRAFTING.REQUEST, _finishCrafting),
    // takeEvery(Actions.WIN_GAME.REQUEST, _winGame),
    // takeEvery(Actions.LOSE_GAME.REQUEST, _loseGame),
    // takeEvery(Actions.END_TURN.REQUEST, _endTurn),
  ]);
}