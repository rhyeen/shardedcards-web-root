import { store } from 'intrastore/src/store.js';
import root from './state/reducers/root.js';
import rootSaga from './state/sagas/root.js';

store.addReducers({ root });

store.runSaga(rootSaga);

export default store;