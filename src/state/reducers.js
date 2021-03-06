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

function _updateActivePage(state, activePage) {
  return {
    ...state,
    route: {
      ...state.route,
      activePage: activePage
    }
  };
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
