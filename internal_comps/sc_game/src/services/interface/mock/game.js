import { 
  Mock,
  CALLBACK_TIME } from '../../../../../sc_shared/src/services/mock.js';

import * as GameController from './controllers/game-controller.js';

export const beginGame = () => {
  return new Promise((resolve) => {
    Mock.debugRequest(beginGame);
    GameController.initializeGame();
    setTimeout(() => {
      Mock.debugSuccessfulResponse(beginGame);
      resolve();
    }, CALLBACK_TIME.POST);
  });
};

export const endCrafting = (turn) => {
  return new Promise((resolve) => {
    Mock.debugRequest(endCrafting);
    GameController.executeCraftingTurn(turn);
    let opponentTurn = GameController.getOpponentTurn();
    let updatedCard = GameController.getUpdatedCards();
    setTimeout(() => {
      let response = {
        opponentTurn: opponentTurn.actions,
        updatedCards: updatedCard
      };
      Mock.debugSuccessfulResponse(endCrafting, response);
      resolve(Mock.prepareResponse(response));
    }, CALLBACK_TIME.POST);
  });
};

export const endTurn = (turn) => {
  return new Promise((resolve) => {
    Mock.debugRequest(endTurn);
    GameController.executePlayTurn(turn);
    GameController.prepareCraftingTurn();
    setTimeout(() => {
      Mock.debugSuccessfulResponse(endTurn);
      resolve();
    }, CALLBACK_TIME.POST);
  });
};