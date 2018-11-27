import * as ActionType from './actions.js';

import { ROUTES } from '../entities/root.js';

const INITIAL_STATE = {
  route: {
    activePage: ROUTES.PAGES.GAME
  },
  network: {
    offline: false
  }
};

function _deepCopyState(state) {
  return {
    route: {
      ...state.route
    },
    network: {
      ...state.network
    }
  };
}

function _updateActivePage(state, activePage) {
  const newState = _deepCopyState(state);
  newState.route.activePage = activePage;
  return newState;
}

const app = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.UPDATE_ACTIVE_PAGE.SUCCESS:
      return _updateActivePage(state, action.activePage);
    default:
      return state;
  }
};

export default app;
