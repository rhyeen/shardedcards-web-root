const COMPONENT_TAG = 'SR_GAME';

/**
 * Base structure derived from: 
 * https://github.com/redux-saga/redux-saga/blob/master/examples/real-world/_actions/index.js
 */
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function _createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${COMPONENT_TAG}_${base}_${type}`;
		return acc;
	}, {})
}

function _createRequestRaw(base) {
  return `${COMPONENT_TAG}_${base}`;
}

function _action(type, payload = {}) {
  return {type, ...payload};
}


export const RECORD_ACTION =  _createRequestRaw('RECORD_ACTION');
export const recordAction = (action) => _action(RECORD_ACTION, {action});

export const SHOW_IN_GAME_MENU =  _createRequestRaw('SHOW_IN_GAME_MENU');
export const showInGameMenu = () => _action(SHOW_IN_GAME_MENU, {});

export const HIDE_IN_GAME_MENU =  _createRequestRaw('HIDE_IN_GAME_MENU');
export const hideInGameMenu = () => _action(HIDE_IN_GAME_MENU, {});

export const RESET_GAME = _createRequestTypes('RESET_GAME');
export const resetGame = {
  request: () => _action(RESET_GAME.REQUEST, {}),
  success: () => _action(RESET_GAME.SUCCESS, {})
};

export const END_TURN = _createRequestTypes('END_TURN');
export const endTurn = {
  request: () => _action(END_TURN.REQUEST, {}),
  success: () => _action(END_TURN.SUCCESS, {})
};

export const BEGIN_TURN = _createRequestTypes('BEGIN_TURN');
export const beginTurn = {
  request: () => _action(BEGIN_TURN.REQUEST, {}),
  success: () => _action(BEGIN_TURN.SUCCESS, {})
};

export const START_CRAFTING = _createRequestTypes('START_CRAFTING');
export const startCrafting = {
  request: () => _action(START_CRAFTING.REQUEST, {}),
  success: () => _action(START_CRAFTING.SUCCESS, {})
};

export const FINISH_CRAFTING = _createRequestTypes('FINISH_CRAFTING');
export const finishCrafting = {
  request: () => _action(FINISH_CRAFTING.REQUEST, {}),
  success: () => _action(FINISH_CRAFTING.SUCCESS, {})
};

export const WIN_GAME = _createRequestTypes('WIN_GAME');
export const winGame = {
  request: () => _action(WIN_GAME.REQUEST, {}),
  success: () => _action(WIN_GAME.SUCCESS, {})
};

export const LOSE_GAME = _createRequestTypes('LOSE_GAME');
export const loseGame = {
  request: () => _action(LOSE_GAME.REQUEST, {}),
  success: () => _action(LOSE_GAME.SUCCESS, {})
};