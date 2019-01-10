import { initializeModel, recordPlayerTurn, getLastOpponentTurn, Model, recordUpdatedCards, resetUpdatedCards } from '../models/model.js';
import * as CardsModel from '../../../../../../sc_cards/src/services/interface/mock/models/model.js';
import * as StatusController from '../../../../../../sc_status/src/services/interface/mock/controllers/status-controller.js';
import * as CardController from '../../../../../../sc_cards/src/services/interface/mock/controllers/cards-controller.js';
import * as TurnActionController from './turn-action-controller.js';
import * as OpponentTurnController from './opponent-turn-controller.js';
import * as CraftingController from '../../../../../../sc_craft/src/services/interface/mock/controllers/craft-controller.js';
import * as StatusModel from '../../../../../../sc_status/src/services/interface/mock/models/model.js';

export const initializeGame = () => {
  StatusController.initializeStatus();
  CardController.initializeCards();
  initializeModel();
};

export const executeCraftingTurn = (turn) => {
  console.info('@TODO');
};

export const prepareCraftingTurn = () => {
  return CraftingController.prepareCraftingTurn();
};

export const getOpponentTurn = () => {
  return getLastOpponentTurn();
};

export const getUpdatedCards = () => {
  return Model.currentTurnUpdatedCards;
};

export const executePlayTurn = (turn) => {
  resetUpdatedCards();
  let validTurn = TurnActionController.executeTurnActions(turn);
  if (validTurn) {
    recordPlayerTurn(turn);
  }
  OpponentTurnController.fulfillOpponentTurn();
  CardController.redrawHand();
  let updatedCards = CardController.refreshOpponentField();
  recordUpdatedCards(updatedCards);
  updatedCards = CardController.refreshPlayerField();
  recordUpdatedCards(updatedCards);
  StatusController.refreshEnergy();
  CardsModel.DEBUG.playerFieldCards();
  CardsModel.DEBUG.opponentFieldCards();
  CardsModel.DEBUG.handCards();
  StatusModel.DEBUG.playerStatus();
};
