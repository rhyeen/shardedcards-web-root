import { 
  Mock,
  CALLBACK_TIME } from '../../../../../sc_shared/src/services/mock.js';

import { Model } from './models/model.js';

export const getPlayerDecks = () => {
  return new Promise((resolve) => {
    Mock.debugRequest(getPlayerDecks);
    setTimeout(() => {
      let response = {
        hand: {
          cards: Model.player.hand.cards,
          refillSize: Model.player.hand.refillSize
        },
        deck: {
          size: Model.player.deck.cards.length
        },
        discardPile: {
          cards: Model.player.discardPile.cards
        },
        lostCards: {
          cards: Model.player.lostCards.cards
        }
      };
      Mock.debugSuccessfulResponse(getHand, response);
      resolve(Mock.prepareResponse(response));
    }, CALLBACK_TIME.GET);
  });
};

export const getOpponentField = () => {
  return new Promise((resolve) => {
    Mock.debugRequest(getOpponentField);
    setTimeout(() => {
      let response = {
        backlog: [
          { size: Model.opponent.field.backlog[0].cards.length },
          { size: Model.opponent.field.backlog[1].cards.length },
          { size: Model.opponent.field.backlog[2].cards.length }
        ],
        slots: Model.opponent.field.slots
      };
      Mock.debugSuccessfulResponse(getOpponentField, response);
      resolve(Mock.prepareResponse(response));
    }, CALLBACK_TIME.GET);
  });
};

export const getCards = () => {
  return new Promise((resolve) => {
    Mock.debugRequest(getCards);
    setTimeout(() => {
      const response = Model.cards;
      Mock.debugSuccessfulResponse(getCards, response);
      resolve(Mock.prepareResponse(response));
    }, CALLBACK_TIME.GET);
  });
};

export const getCardsUpdatedFromOpponentTurn = () => {
  return new Promise((resolve) => {
    Mock.debugRequest(getCardsUpdatedFromOpponentTurn);
    setTimeout(() => {
      let response = {
        cards: Model.cardsUpdatedFromOpponentTurn
      };
      Mock.debugSuccessfulResponse(getCardsUpdatedFromOpponentTurn, response);
      resolve(Mock.prepareResponse(response));
    }, CALLBACK_TIME.GET);
  });
};