import {
  INTERFACE,
  interfaceState,
  invalidInterfaceState } from '../../../../sc_shared/src/services/interface-state.js';

import * as CallHttp from './http/cards.js';
import * as CallMock from './mock/cards.js';

export const getPlayerDecks = () => {
  switch(interfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.getPlayerDecks();
    case INTERFACE.MOCK:
      return CallMock.getPlayerDecks();
    default:
      return invalidInterfaceState();
  }
};

export const getCards = () => {
  switch(interfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.getCards();
    case INTERFACE.MOCK:
      return CallMock.getCards();
    default:
      return invalidInterfaceState();
  }
};

export const getPlayingField = () => {
  switch(interfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.getPlayingField();
    case INTERFACE.MOCK:
      return CallMock.getPlayingField();
    default:
      return invalidInterfaceState();
  }
};
