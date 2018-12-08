import {
  INTERFACE,
  interfaceState,
  invalidInterfaceState } from '../../../../sc_shared/src/services/interface-state.js';

import * as CallHttp from './http/cards.js';
import * as CallMock from './mock/cards.js';

export const getHand = () => {
  switch(interfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.getHand();
    case INTERFACE.MOCK:
      return CallMock.getHand();
    default:
      return invalidInterfaceState();
  }
}

export const getCards = () => {
  switch(interfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.getCards();
    case INTERFACE.MOCK:
      return CallMock.getCards();
    default:
      return invalidInterfaceState();
  }
}

export const getOpponentField = () => {
  switch(interfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.getOpponentField();
    case INTERFACE.MOCK:
      return CallMock.getOpponentField();
    default:
      return invalidInterfaceState();
  }
}