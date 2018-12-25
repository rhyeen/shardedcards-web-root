import { put, takeEvery, all, call } from 'redux-saga/effects';
import { Log } from '../../../sc_shared/src/services/logger.js';

import * as Actions from './actions.js';
import * as StatusInterface from '../services/interface/status.js';

function* _spendAllocatedPlayerEnergy() {
  yield put(Actions.spendAllocatedPlayerEnergy.success());
}

function* _modifyPlayerEnergy({maxEnergyModifier, currentEnergyModifier}) {
  yield put(Actions.modifyPlayerEnergy.success({maxEnergyModifier, currentEnergyModifier}));
}

function* _setPlayerStatus() {
  try {
    let { player } = yield call(StatusInterface.getPlayerStatus);
    yield put(Actions.setPlayerStatus.success(player.health.max, player.health.current, player.energy.max, player.energy.current));
  } catch (e) {
    yield Log.error(`@TODO: unable to getPlayerStatus(): ${e}`);
  }
}

export default function* root() {
  yield all([
    takeEvery(Actions.SPEND_ALLOCATED_PLAYER_ENERGY.REQUEST, _spendAllocatedPlayerEnergy),
    takeEvery(Actions.MODIFY_PLAYER_ENERGY.REQUEST, _modifyPlayerEnergy),
    takeEvery(Actions.SET_PLAYER_STATUS.REQUEST, _setPlayerStatus),
  ]);
}