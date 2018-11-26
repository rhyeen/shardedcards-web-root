import * as ActionType from '../actions/sc_game.js';

import { GAME_STATES } from '../../entities/game-states.js';

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

function _deepCopyState(state) {
  return {
    ui: {
      menu: {
        ...state.ui.menu
      },
      game: {
        ...state.ui.game
      }
    }
  };
}

function _toggleMenuState(state, showMenu) {
  const newState = _deepCopyState(state);
  newState.ui.menu.show = showMenu;
  return newState;
}

function _updateGameState(state, gameState) {
  const newState = _deepCopyState(state);
  newState.ui.game.state = gameState;
  return newState;
}

export const sc_game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.SHOW_IN_GAME_MENU:
      return _toggleMenuState(state, true);
    case ActionType.HIDE_IN_GAME_MENU:
      return _toggleMenuState(state, false);      
    case ActionType.RESET_GAME.SUCCESS:
      return _updateGameState(state, GAME_STATES.PLAYING);
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
