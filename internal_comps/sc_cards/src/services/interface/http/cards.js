import { Http } from '../../../../../sc_shared/src/services/http.js';

export const getHand = () => {
  return Http.get('cardgroups/hand');
}

export const getCards = () => {
  return Http.get('cards');
}

export const getOpponentField = () => {
  return Http.get('cardgroups/opponentfield');
}