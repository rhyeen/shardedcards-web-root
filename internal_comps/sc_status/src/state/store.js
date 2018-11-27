import { store } from 'intrastore/src/store.js';
import { sc_status } from './reducers.js';
import sc_statusSaga from './sagas.js';

store.addReducers({ sc_status });

store.runSaga(sc_statusSaga);

export default store;