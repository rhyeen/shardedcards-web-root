import { Http } from '../../../../../sc_shared/src/services/http.js';

export const beginGame = () => {
  return Http.post('game/begin');
}

export const endCrafting = (turn) => {
  return Http.post('game/turn/crafting');
}

export const endTurn = (turn) => {
  return Http.post('game/turn/play');
}