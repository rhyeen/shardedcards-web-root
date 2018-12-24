import { 
  Mock,
  CALLBACK_TIME } from '../../../../../sc_shared/src/services/mock.js';

import * as GameController from './controllers/game-controller.js';
import * as OpponentTurnController from './controllers/opponent-turn-controller.js';

export const beginGame = () => {
  return new Promise((resolve) => {
    Mock.debugRequest(beginGame);
    setTimeout(() => {
      GameController.initializeGame();
      resolve();
    }, CALLBACK_TIME.POST);
  });
};

export const endCrafting = (turn) => {
  return new Promise((resolve) => {
    Mock.debugRequest(endCrafting);
    setTimeout(() => {
      GameController.executeCraftingTurn(turn);
      OpponentTurnController.executeOpponentTurn();
      let response = {
        opponentTurn: GameController.getOpponentTurn()
      };
      Mock.debugSuccessfulResponse(endCrafting, response);
      resolve(Mock.prepareResponse(response));
    }, CALLBACK_TIME.POST);
  })
};

export const endTurn = (turn) => {
  return new Promise((resolve) => {
    Mock.debugRequest(endTurn);
    setTimeout(() => {
      GameController.executePlayTurn(turn);
      resolve();
    }, CALLBACK_TIME.POST);
  })
};