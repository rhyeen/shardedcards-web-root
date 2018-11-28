import * as ActionType from './actions.js';

import { GAME_STATES } from '../entities/game-states.js';

const INITIAL_STATE = {
  ui: {
    menu: {
      show: false
    },
    game: {
      state: GAME_STATES.PLAYING
    }
  }
};

function _toggleMenuState(state, showMenu) {
  return {
    ...state,
    ui: {
      ...state.ui,
      menu: {
        ...state.ui.menu,
        show: showMenu
      }
    }
  };
}

function _updateGameState(state, gameState) {
  return {
    ...state,
    ui: {
      ...state.ui,
      game: {
        ...state.ui.game,
        state: gameState
      }
    }
  };
}

export const sc_game = (state = INITIAL_STATE, action) => {
  let newState;  
  switch (action.type) {
    case ActionType.SHOW_IN_GAME_MENU:
      return _toggleMenuState(state, true);
    case ActionType.HIDE_IN_GAME_MENU:
      return _toggleMenuState(state, false);
    case ActionType.RESET_GAME.SUCCESS:
      newState = _toggleMenuState(newState, false);
      return _updateGameState(newState, GAME_STATES.PLAYING);
    case ActionType.START_CRAFTING.SUCCESS:
      return _updateGameState(state, GAME_STATES.CRAFTING);
    case ActionType.FINISH_CRAFTING.SUCCESS:
      return _updateGameState(state, GAME_STATES.PLAYING);
    case ActionType.WIN_GAME.SUCCESS:
      return _updateGameState(state, GAME_STATES.WIN);
    case ActionType.LOSE_GAME.SUCCESS:
      return _updateGameState(state, GAME_STATES.LOSE);
    default:
      return state;
  }
};
