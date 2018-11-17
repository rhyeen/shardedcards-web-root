import { call, put, takeEvery, all } from 'redux-saga/effects';

import { getPageFromPath } from '../../entities/root.js';
import * as Actions from '../actions/root.js';
import { importActivePage } from '../../services/page-import.js';

function* updateActivePage({activePage}) {
  const _activePage = yield call(importActivePage, activePage);
  yield put(Actions.updateActivePage.success(_activePage));
}

function* navigate({path}) {
  yield updateActivePage({activePage: getPageFromPath(path)});
}

export default function* root() {
  yield all([
    takeEvery(Actions.UPDATE_ACTIVE_PAGE.REQUEST, updateActivePage),
    takeEvery(Actions.NAVIGATE, navigate)
  ]);
}