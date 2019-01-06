import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as Actions from './actions.js';
import * as CraftingInterface from '../services/interface/craft.js';

function* _setCraftingBaseCard() {
  try {
    let { craftingBaseCard } = yield call(CraftingInterface.getCraftingBaseCard);
    yield put(Actions.setCraftingBaseCard.success(craftingBaseCard));
  } catch (e) {
    yield Log.error(`@TODO: unable to _setCraftingBaseCard(): ${e}`);
  }
}

function* _setCraftingParts() {
  try {
    let { craftingParts } = yield call(CraftingInterface.getCraftingParts);
    yield put(Actions.setCraftingParts.success(craftingParts));
  } catch (e) {
    yield Log.error(`@TODO: unable to _setCraftingParts(): ${e}`);
  }
}

export default function* root() {
  yield all([
    takeEvery(Actions.SET_CRAFTING_BASE_CARD.REQUEST, _setCraftingBaseCard),
    takeEvery(Actions.SET_CRAFTING_PARTS.REQUEST, _setCraftingParts),
  ]);
}