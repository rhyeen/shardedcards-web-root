import {
  INTERFACE,
  interfaceState,
  invalidInterfaceState } from '../../../../sc_shared/src/services/interface-state.js';

import * as CallHttp from './http/game.js';
import * as CallMock from './mock/game.js';

export const beginGame = () => {
  switch(interfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.beginGame();
    case INTERFACE.MOCK:
      return CallMock.beginGame();
    default:
      return invalidInterfaceState();
  }
};

export const endCrafting = () => {
  switch(interfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.endCrafting();
    case INTERFACE.MOCK:
      return CallMock.endCrafting();
    default:
      return invalidInterfaceState();
  }
};

export const endTurn = () => {
  switch(interfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.endTurn();
    case INTERFACE.MOCK:
      return CallMock.endTurn();
    default:
      return invalidInterfaceState();
  }
};