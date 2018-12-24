import { TURN_TAKERS } from './turn.js';
import { Log } from '../../../../../../sc_shared/src/services/logger.js';

export const Model = _getInitialModel();

function _getInitialModel() {
  return {
    turnHistory: []
  };
}

export function initializeModel() {
  let model = _getInitialModel();
  Model.turnHistory = [...model.turnHistory];
}

export function recordPlayerTurn(turn) {
  Model.turnHistory.push({
    turn,
    takenBy: TURN_TAKERS.PLAYER
  });
}

export function recordOpponentTurn(turn) {
  Model.turnHistory.push({
    turn,
    takenBy: TURN_TAKERS.OPPONENT
  });
}

export function getLastOpponentTurn() {
  if (!Model.turnHistory.length) {
    Log.error('Cannot retrieve opponent turn, no history is recorded');
  }
  if (Model.turnHistory[Model.turnHistory.length - 1].takenBy === TURN_TAKERS.OPPONENT) {
    return Model.turnHistory[Model.turnHistory.length - 1].turn;
  }
  if (Model.turnHistory.length < 2) {
    Log.error('Cannot retrieve opponent turn, only player turn has been recorded');
  }
  if (Model.turnHistory[Model.turnHistory.length - 2].takenBy === TURN_TAKERS.OPPONENT) {
    return Model.turnHistory[Model.turnHistory.length - 1].turn;
  }
  Log.error('Cannot retrieve opponent turn, opponent turn does not exist within two consecutive turns');
}