const app = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page
      };
    case UPDATE_OFFLINE:
      return {
        ...state,
        offline: action.offline
      };
    case OPEN_SNACKBAR:
      return {
        ...state,
        snackbarOpened: true
      };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarOpened: false
      };
    default:
      return state;
  }
}

const defaultState = {
  energy: {
    max: 0,
    current: 0,
    pending: 0
  },
  health: {
    max: 0,
    current: 0,
    pending: 0
  }
}

export const GAME_STATE_PLAYING = 'playing';
export const GAME_STATE_LOSE = 'lose';
export const GAME_STATE_WIN = 'win';
export const GAME_STATE_CRAFTING = 'crafting';

const defaultState = {
  showMenu: false,
  gameState: GAME_STATE_PLAYING
}

export const FIRST_TURN_PLAYER = 'player';
export const FIRST_TURN_OPPONENT = 'opponent';

const defaultState = {
  pendingTurn: [],
  lastCastedCard: {},
  firstTurn: FIRST_TURN_PLAYER,
  playersTurn: false,
  playerHistory: [],
  opponentHistory: []
}
