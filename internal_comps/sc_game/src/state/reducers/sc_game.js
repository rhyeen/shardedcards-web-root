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

function _getState(state, copyState) {
  if (copyState) {
    return _deepCopyState(state);
  }
  return state;
}

function _toggleMenuState(state, showMenu, copyState = false) {
  let newState = _getState(state, copyState);
  newState.ui.menu.show = showMenu;
  return newState;
}

function _updateGameState(state, gameState, copyState = false) {
  let newState = _getState(state, copyState);
  newState.ui.game.state = gameState;
  return newState;
}

export const sc_game = (state = INITIAL_STATE, action) => {
  let newState;  
  switch (action.type) {
    case ActionType.SHOW_IN_GAME_MENU:
      return _toggleMenuState(state, true, true);
    case ActionType.HIDE_IN_GAME_MENU:
      return _toggleMenuState(state, false, true);
    case ActionType.RESET_GAME.SUCCESS:
      newState = _deepCopyState(state);
      _toggleMenuState(newState, false);
      _updateGameState(newState, GAME_STATES.PLAYING);
      return newState;
    case ActionType.START_CRAFTING.SUCCESS:
      return _updateGameState(state, GAME_STATES.CRAFTING, true);
    case ActionType.FINISH_CRAFTING.SUCCESS:
      return _updateGameState(state, GAME_STATES.PLAYING, true);
    case ActionType.WIN_GAME.SUCCESS:
      return _updateGameState(state, GAME_STATES.WIN, true);
    case ActionType.LOSE_GAME.SUCCESS:
      return _updateGameState(state, GAME_STATES.LOSE, true);
    default:
      return state;
  }
};
