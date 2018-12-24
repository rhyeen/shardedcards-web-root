import { store } from 'intrastore/src/store.js';
import { sc_game } from './reducers.js';
import sc_gameSaga from './sagas.js';

store.addReducers({ sc_game });

store.runSaga(sc_gameSaga);

export const localStore = store;