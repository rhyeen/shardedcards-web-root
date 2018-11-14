import { call, put, takeEvery } from 'redux-saga/effects';

import * as ActionType from '../actions/root.js';
import { takeEvery } from 'redux-saga/effects';
import { importActivePage } from '../../services/page-import.js';

function* updateActivePage(action) {
  const activePage = yield call(importActivePage, action.activePage);
  yield put({type: ActionType.UPDATE_ACTIVE_PAGE_SUCC, activePage});
}

export default function* root() {
  yield all([
    takeEvery(ActionType.UPDATE_ACTIVE_PAGE, updateActivePage)
  ])
}