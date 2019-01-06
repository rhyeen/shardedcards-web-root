import { store } from 'intrastore/src/store.js';
import { sc_craft } from './reducers.js';
import sc_craftSaga from './sagas.js';

store.addReducers({ sc_craft });

store.runSaga(sc_craftSaga);

export const localStore = store;