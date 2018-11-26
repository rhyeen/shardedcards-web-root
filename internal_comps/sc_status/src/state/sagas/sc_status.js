import { put, takeEvery, all } from 'redux-saga/effects';

import * as Actions from '../actions/sc_status.js';

function* _spendAllocatedPlayerEnergy() {
  yield put(Actions.spendAllocatedPlayerEnergy.success());
}

function* _modifyPlayerEnergy({maxEnergyModifier, currentEnergyModifier}) {
  yield put(Actions.modifyPlayerEnergy.success({maxEnergyModifier, currentEnergyModifier}));
}

export default function* root() {
  yield all([
    takeEvery(Actions.SPEND_ALLOCATED_PLAYER_ENERGY.REQUEST, _spendAllocatedPlayerEnergy),
    takeEvery(Actions.MODIFY_PLAYER_ENERGY.REQUEST, _modifyPlayerEnergy)
  ]);
}