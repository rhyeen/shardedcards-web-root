import * as ActionType from '../actions/root.js';

import { routes } from '../../entities/root.js';

const INITIAL_STATE = {
  route: {
    activePage: routes.pages.game
  },
  network: {
    offline: false
  }
};

const app = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.UPDATE_ACTIVE_PAGE.SUCCESS:
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
