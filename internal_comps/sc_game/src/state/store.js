import { store } from 'intrastore/src/store.js';
import { sc_game } from './reducers/sc_game.js';
import sc_gameSaga from './sagas/sc_game.js';

store.addReducers({ sc_game });

store.runSaga(sc_gameSaga);

export default store;