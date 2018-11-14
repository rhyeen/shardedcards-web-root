import * as ActionType from '../actions/root.js';

import {
  ROOT_ROUTE_PAGE_GAME
} from '../../entities/pages.js';

const INITIAL_STATE = {
  route: {
    activePage: ROOT_ROUTE_PAGE_GAME
  },
  network: {
    offline: false
  }
};

const app = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.UPDATE_ACTIVE_PAGE_SUCC:
      return {
        ...state,
        route: {
          ...state.route,
          activePage: action.activePage
        }
      };
    default:
      return state;
  }
};

export default app;
