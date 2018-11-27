import * as ActionType from '../actions/sc_cards.js';

const INITIAL_STATE = {
  ui: {
    selectedCard: {
      source: null,
      id: null,
      instance: null,
      handIndex: null,
      playAreaIndex: null
    },
    selectedAbility: {
      target: null,
      id: null,
      instance: null,
      abilityId: null,
      handIndex: null,
      playAreaIndex: null
    },
    playCard: {
      source: null,
      instance: null,
      handIndex: null,
      playAreaIndex: null
    }
  },
  entities: {
    player: {
      cards: {},
      hand: {
        cards: [],
        size: 5
      },
      deck: {
        size: 0
      },
      discardPile: {
        size: 0
      },
      lostCards: {
        size: 0
      },
      field: {
        slots: [
          {
            id: null,
            instance: null
          },
          {
            id: null,
            instance: null
          },
          {
            id: null,
            instance: null
          }
        ]
      }
    },
    opponent: {
      field: {
        backlog: [
          {
            size: 0
          },
          {
            size: 0
          },
          {
            size: 0
          }
        ],
        slots: [
          {
            id: null,
            instance: null
          },
          {
            id: null,
            instance: null
          },
          {
            id: null,
            instance: null
          }
        ]
      }
    }
  }
};

function _deepCopyState(state) {
  return {};
}

function _getState(state, copyState) {
  if (copyState) {
    return _deepCopyState(state);
  }
  return state;
}

export const sc_cards = (state = INITIAL_STATE, action) => {
  let newState;
  switch (action.type) {
    // case ActionType.SHOW_IN_GAME_MENU:
    //   return _toggleMenuState(state, true, true);
    // case ActionType.HIDE_IN_GAME_MENU:
    //   return _toggleMenuState(state, false, true);
    // case ActionType.RESET_GAME.SUCCESS:
    //   newState = _deepCopyState(state);
    //   _toggleMenuState(newState, false);
    //   _updateGameState(newState, GAME_STATES.PLAYING);
    //   return newState;
    // case ActionType.START_CRAFTING.SUCCESS:
    //   return _updateGameState(state, GAME_STATES.CRAFTING, true);
    // case ActionType.FINISH_CRAFTING.SUCCESS:
    //   return _updateGameState(state, GAME_STATES.PLAYING, true);
    // case ActionType.WIN_GAME.SUCCESS:
    //   return _updateGameState(state, GAME_STATES.WIN, true);
    // case ActionType.LOSE_GAME.SUCCESS:
    //   return _updateGameState(state, GAME_STATES.LOSE, true);
    default:
      return state;
  }
};
