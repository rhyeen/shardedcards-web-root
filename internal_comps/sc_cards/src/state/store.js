import { store } from 'intrastore/src/store.js';
import { sc_cards } from './reducers.js';
import sc_cardsSaga from './sagas.js';

store.addReducers({ sc_cards });

store.runSaga(sc_cardsSaga);

export const localStore = store;