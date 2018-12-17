import { put, takeEvery, all } from 'redux-saga/effects';

import * as Actions from './actions.js';
import * as StatusInterface from '../services/interface/status.js';

function* _spendAllocatedPlayerEnergy() {
  yield put(Actions.spendAllocatedPlayerEnergy.success());
}

function* _modifyPlayerEnergy({maxEnergyModifier, currentEnergyModifier}) {
  yield put(Actions.modifyPlayerEnergy.success({maxEnergyModifier, currentEnergyModifier}));
}

function* _setPlayerStatus() {
  let { player } = StatusInterface.getPlayerStatus();
  yield put(Actions.setPlayerStatus.success(player.health.max, player.health.current, player.energy.max, player.energy.current));
}

export default function* root() {
  yield all([
    takeEvery(Actions.SPEND_ALLOCATED_PLAYER_ENERGY.REQUEST, _spendAllocatedPlayerEnergy),
    takeEvery(Actions.MODIFY_PLAYER_ENERGY.REQUEST, _modifyPlayerEnergy),
    takeEvery(Actions.SET_PLAYER_STATUS.REQUEST, _setPlayerStatus),
  ]);
}