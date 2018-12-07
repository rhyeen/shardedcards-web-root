import {
  INTERFACE,
  InterfaceState,
  InvalidInterfaceState } from '../../../../sc_shared/src/services/interface-state.js';

import * as CallHttp from './http/cards.js';
import * as CallMock from './mock/cards.js';

export const GetHand = () => {
  switch(InterfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.GetHand();
    case INTERFACE.MOCK:
      return CallMock.GetHand();
    default:
      return InvalidInterfaceState();
  }
}

export const GetCards = () => {
  switch(InterfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.GetCards();
    case INTERFACE.MOCK:
      return CallMock.GetCards();
    default:
      return InvalidInterfaceState();
  }
}

export const GetOpponentField = () => {
  switch(InterfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.GetOpponentField();
    case INTERFACE.MOCK:
      return CallMock.GetOpponentField();
    default:
      return InvalidInterfaceState();
  }
}