import { Model, initializeModel } from '../models/model.js';
import * as CardsModel from '../../../../../../sc_cards/src/services/interface/mock/models/model.js';
import * as StatusController from '../../../../../../sc_status/src/services/interface/mock/controllers/status-controller.js';
import * as CardController from '../../../../../../sc_cards/src/services/interface/mock/controllers/cards-controller.js';
import * as TurnActionController from './turn-action-controller.js';
import { Log } from '../../../../../../sc_shared/src/services/logger.js';
import { TURN_TAKERS } from '../models/turn.js';

export const initializeGame = () => {
  StatusController.initializeStatus();
  CardController.initializeCards();
  initializeModel();
};

export const executeCraftingTurn = (turn) => {
  console.trace('@TODO');
};

export const getOpponentTurn = () => {
  return _getLastTurn();
};

function _getLastTurn() {
  return Model.turnHistory[Model.turnHistory.length - 1];
}

export const executePlayTurn = (turn) => {
  Log.debug("BEFORE RECORD PLAYER TURN");
  Log.debug(CardsModel.Model);
  let validTurn = TurnActionController.executeTurn(turn);
  if (validTurn) {
    _recordTurn(turn);
  }
  CardController.redrawHand();
  CardController.refreshOpponentField();
  CardController.refreshPlayerField();
  Log.debug("AFTER RECORD PLAYER TURN");
  Log.debug(CardsModel.Model);
};

function _recordTurn(turn) {
  Model.turnHistory.push({
    turn,
    takenBy: TURN_TAKERS.PLAYER
  });
}