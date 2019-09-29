import { initializeModel, recordPlayerTurn, getLastOpponentTurn, Model, recordUpdatedCards, resetUpdatedCards } from '../models/model.js';
import * as CardsModel from '../../../../../../sc_cards/src/services/interface/mock/models/model.js';
import * as StatusController from '../../../../../../sc_status/src/services/interface/mock/controllers/status-controller.js';
import * as CardController from '../../../../../../sc_cards/src/services/interface/mock/controllers/cards-controller.js';
import * as CraftingTurnActionController from './crafting-turn-action-controller.js';
import * as TurnActionController from './turn-action-controller.js';
import * as OpponentTurnController from './opponent-turn-controller.js';
import * as CraftingController from '../../../../../../sc_craft/src/services/interface/mock/controllers/craft-controller.js';
import * as StatusModel from '../../../../../../sc_status/src/services/interface/mock/models/model.js';
import { GAME_STATES } from '../../../../entities/game-states.js';

export const initializeGame = () => {
  StatusController.initializeStatus();
  CardController.initializeCards();
  initializeModel();
};

export const executeCraftingTurn = (turn) => {
  let validTurn = CraftingTurnActionController.executeCraftingTurnActions(turn);
  if (validTurn) {
    recordPlayerTurn(turn);
  }
  CardController.redrawHand();
  CardsModel.DEBUG.handCards();
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

export function getNewlyCraftedCards() {
  return CardsModel.getNewlyCraftedCards();
}

export const getGameState = () => {
  if (_gameIsLost()) {
    return GAME_STATES.LOSE;
  }
  if (_gameIsWon()) {
    return GAME_STATES.WIN;
  }
  return GAME_STATES.PLAYING;
}

function _gameIsLost() {
  return StatusModel.Model.player.health.current <= 0;
}

function _gameIsWon() {
  let totalOpponentMinionsOnField = 0;
  totalOpponentMinionsOnField += !!CardsModel.Model.opponent.field.slots[0].id ? 1 : 0;
  totalOpponentMinionsOnField += !!CardsModel.Model.opponent.field.slots[1].id ? 1 : 0;
  totalOpponentMinionsOnField += !!CardsModel.Model.opponent.field.slots[2].id ? 1 : 0;
  return totalOpponentMinionsOnField === 0;
}

export const executePlayTurn = (turn) => {
  resetUpdatedCards();
  let validTurn = TurnActionController.executeTurnActions(turn);
  if (validTurn) {
    recordPlayerTurn(turn);
  }
  OpponentTurnController.fulfillOpponentTurn();
  let updatedCards = CardController.refreshOpponentField();
  recordUpdatedCards(updatedCards);
  updatedCards = CardController.refreshPlayerField();
  recordUpdatedCards(updatedCards);
  StatusController.refreshEnergy();
  CardsModel.DEBUG.playerFieldCards();
  CardsModel.DEBUG.opponentFieldCards();
  StatusModel.DEBUG.playerStatus();
};
