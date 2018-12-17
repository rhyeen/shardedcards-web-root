import { Http } from '../../../../../sc_shared/src/services/http.js';

export const getPlayerDecks = () => {
  return Http.get('cardgroups/playerdecks');
}

export const getCards = () => {
  return Http.get('cards');
}

export const getOpponentField = () => {
  return Http.get('cardgroups/opponentfield');
}

export const getCardsUpdatedFromOpponentTurn = () => {
  return Http.get('cards/updated');
}