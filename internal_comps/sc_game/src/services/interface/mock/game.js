import { 
  Mock,
  CALLBACK_TIME } from '../../../../../sc_shared/src/services/mock.js';

import * as GameController from './controllers/game-controller.js';
import * as OpponentTurnController from './controllers/opponent-turn-controller.js';

export const beginGame = () => {
  return new Promise((resolve) => {
    Mock.debugRequest(beginGame);
    GameController.initializeGame();
    setTimeout(() => {
      resolve();
    }, CALLBACK_TIME.POST);
  });
};

export const endCrafting = (turn) => {
  return new Promise((resolve) => {
    Mock.debugRequest(endCrafting);
    GameController.executeCraftingTurn(turn);
    opponentTurn = GameController.getOpponentTurn();
    setTimeout(() => {
      let response = {
        opponentTurn: opponentTurn.actions,
        updatedCards: opponentTurn.updatedCards
      };
      Mock.debugSuccessfulResponse(endCrafting, response);
      resolve(Mock.prepareResponse(response));
    }, CALLBACK_TIME.POST);
  })
};

export const endTurn = (turn) => {
  return new Promise((resolve) => {
    Mock.debugRequest(endTurn);
    GameController.executePlayTurn(turn);
    OpponentTurnController.fulfillOpponentTurn();
    setTimeout(() => {
      resolve();
    }, CALLBACK_TIME.POST);
  })
};