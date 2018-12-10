import { Model, initializeModel } from '../models/model.js';
import * as CardsModel from '../../../../../../sc_cards/src/services/interface/mock/models/model.js';

import * as StatusController from '../../../../../../sc_status/src/services/interface/mock/controllers/status-controller.js';
import * as CardController from '../../../../../../sc_cards/src/services/interface/mock/controllers/cards-controller.js';
import { Log } from '../../../../../../sc_shared/src/services/logger.js';

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
  _recordPlayActions();
  // @TODO:
  RedrawHand() 
  // @TODO:
  BeginPlayerTurn()
  // @TODO:
  RefreshOpponentField()
  Log.debug("AFTER RECORD PLAYER TURN");
  Log.debug(CardsModel.Model);
};

function _recordPlayActions(turn) {
  for (let action of turn) {
    _recordPlayAction(action);
  }
}

function _recordPlayAction(action) {
  switch(action.type) {
    case ATTACK_CARD:
      return _recordAttackCardAction(action)
    case PLACE_ON_PLAY_AREA:
      return _recordPlaceOnPlayAreaAction(action)
    case CAST_CARD_FROM_HAND:
      return _recordCastCardFromHand(action)
    default:
      Log.error(`Unexpected action type: ${action.type}`);
  }
}
