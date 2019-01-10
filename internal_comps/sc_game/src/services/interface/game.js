import {
  INTERFACE,
  interfaceState,
  invalidInterfaceState } from '../../../../sc_shared/src/services/interface-state.js';

import * as CallHttp from './http/game.js';
import * as CallMock from './mock/game.js';

export const beginGame = () => {
  switch (interfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.beginGame();
    case INTERFACE.MOCK:
      return CallMock.beginGame();
    default:
      return invalidInterfaceState();
  }
};

export const endCrafting = (turn) => {
  switch (interfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.endCrafting(turn);
    case INTERFACE.MOCK:
      return CallMock.endCrafting(turn);
    default:
      return invalidInterfaceState();
  }
};

export const endTurn = (turn) => {
  switch (interfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.endTurn(turn);
    case INTERFACE.MOCK:
      return CallMock.endTurn(turn);
    default:
      return invalidInterfaceState();
  }
};