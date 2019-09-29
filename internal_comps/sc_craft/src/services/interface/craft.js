import {
  INTERFACE,
  interfaceState,
  invalidInterfaceState } from '../../../../sc_shared/src/services/interface-state.js';

import * as CallHttp from './http/craft.js';
import * as CallMock from './mock/craft.js';

export const getCraftingBaseCard = () => {
  switch (interfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.getCraftingBaseCard();
    case INTERFACE.MOCK:
      return CallMock.getCraftingBaseCard();
    default:
      return invalidInterfaceState();
  }
};

export const getCraftingParts = () => {
  switch (interfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.getCraftingParts();
    case INTERFACE.MOCK:
      return CallMock.getCraftingParts();
    default:
      return invalidInterfaceState();
  }
};

export function getCardIdentifiers(card) {
  switch (interfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.getCardIdentifiers(card);
    case INTERFACE.MOCK:
      return CallMock.getCardIdentifiers(card);
    default:
      return invalidInterfaceState();
  }
}