import { TURN_TAKERS } from './turn.js';
import { Log } from '../../../../../../sc_shared/src/services/logger.js';

export const Model = _getInitialModel();

function _getInitialModel() {
  return {
    turnHistory: [],
    currentTurnUpdatedCards: []
  };
}

export function initializeModel() {
  let model = _getInitialModel();
  Model.turnHistory = [...model.turnHistory];
  Model.currentTurnUpdatedCards = [...model.currentTurnUpdatedCards];
}

export function recordPlayerTurn(turn) {
  Model.turnHistory.push({
    turn,
    takenBy: TURN_TAKERS.PLAYER
  });
}

export function recordOpponentTurn(turn, updatedCards) {
  Model.turnHistory.push({
    actions: turn,
    takenBy: TURN_TAKERS.OPPONENT
  });
  recordUpdatedCards(updatedCards);
}

export function resetUpdatedCards() {
  Model.currentTurnUpdatedCards = [];
}

export function recordUpdatedCards(updatedCards) {
  for (let updatedCard of updatedCards) {
    let index = _indexInUpdatedCardsSet(updatedCard);
    if (index === -1) {
      Model.currentTurnUpdatedCards.push({
        id: updatedCard.id,
        instance: updatedCard.instance,
        card: updatedCard.card
      });
    } else {
      Model.currentTurnUpdatedCards[index].card = updatedCard.card;
    }
  }
}

function _indexInUpdatedCardsSet(cardContext) {
  for (let i = 0; i < Model.currentTurnUpdatedCards.length; i++) {
    let updatedCard = Model.currentTurnUpdatedCards[i];
    if (updatedCard.id === cardContext.id && updatedCard.instance === cardContext.instance) {
      return i;
    }
  }
  return -1;
}

export function getLastOpponentTurn() {
  if (!Model.turnHistory.length) {
    Log.error('Cannot retrieve opponent turn, no history is recorded');
  }
  if (Model.turnHistory[Model.turnHistory.length - 1].takenBy === TURN_TAKERS.OPPONENT) {
    return Model.turnHistory[Model.turnHistory.length - 1];
  }
  if (Model.turnHistory.length < 2) {
    Log.error('Cannot retrieve opponent turn, only player turn has been recorded');
  }
  if (Model.turnHistory[Model.turnHistory.length - 2].takenBy === TURN_TAKERS.OPPONENT) {
    return Model.turnHistory[Model.turnHistory.length - 1];
  }
  Log.error('Cannot retrieve opponent turn, opponent turn does not exist within two consecutive turns');
}
