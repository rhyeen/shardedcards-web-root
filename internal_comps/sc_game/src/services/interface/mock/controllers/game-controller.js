import { initializeModel, recordPlayerTurn, getLastOpponentTurn } from '../models/model.js';
import * as CardsModel from '../../../../../../sc_cards/src/services/interface/mock/models/model.js';
import * as StatusController from '../../../../../../sc_status/src/services/interface/mock/controllers/status-controller.js';
import * as CardController from '../../../../../../sc_cards/src/services/interface/mock/controllers/cards-controller.js';
import * as TurnActionController from './turn-action-controller.js';
import * as OpponentTurnController from './opponent-turn-controller.js';
import * as CraftingController from '../../../../../../sc_craft/src/services/interface/mock/controllers/craft-controller.js';
import { Log } from '../../../../../../sc_shared/src/services/logger.js';

export const initializeGame = () => {
  StatusController.initializeStatus();
  CardController.initializeCards();
  initializeModel();
};

export const executeCraftingTurn = (turn) => {
  console.trace('@TODO');
};

export const prepareCraftingTurn = () => {
  return CraftingController.prepareCraftingTurn();
};

export const getOpponentTurn = () => {
  return getLastOpponentTurn();
};

export const executePlayTurn = (turn) => {
  Log.debug("BEFORE RECORD PLAYER TURN");
  Log.debug(CardsModel.Model);
  let validTurn = TurnActionController.executeTurn(turn);
  if (validTurn) {
    recordPlayerTurn(turn);
  }
  OpponentTurnController.fulfillOpponentTurn();
  CardController.redrawHand();
  CardController.refreshOpponentField();
  CardController.refreshPlayerField();
  Log.debug("AFTER RECORD PLAYER TURN");
  Log.debug(CardsModel.Model);
};
