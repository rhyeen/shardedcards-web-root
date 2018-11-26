import { store } from 'intrastore/src/store.js';
import { sc_status } from './reducers/sc_status.js';
import sc_statusSaga from './sagas/sc_status.js';

store.addReducers({ sc_status });

store.runSaga(sc_statusSaga);

export default store;