import { Http } from '../../../../../sc_shared/src/services/http.js';

export const GetHand = () => {
  return Http.get('cardgroups/hand');
}

export const GetCards = () => {
  return Http.get('cards');
}

export const GetOpponentField = () => {
  return Http.get('cardgroups/opponentfield');
}