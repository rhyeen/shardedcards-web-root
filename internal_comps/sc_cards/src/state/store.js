import { store } from 'intrastore/src/store.js';
import { sc_cards } from './reducers/sc_cards.js';
import sc_cardsSaga from './sagas/sc_cards.js';

store.addReducers({ sc_cards });

store.runSaga(sc_cardsSaga);

export default store;