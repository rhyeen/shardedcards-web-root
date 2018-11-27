import { store } from 'intrastore/src/store.js';
import root from './reducers.js';
import rootSaga from './sagas.js';

store.addReducers({ root });

store.runSaga(rootSaga);

export default store;