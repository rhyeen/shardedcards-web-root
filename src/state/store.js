import { store } from 'intrastore/src/store.js';
import root from './reducers/root.js';
import rootSaga from './sagas/root.js';

store.addReducers({ root });

store.runSaga(rootSaga);

export default store;