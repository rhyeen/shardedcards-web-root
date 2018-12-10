import {
  INTERFACE,
  interfaceState,
  invalidInterfaceState } from '../../../../sc_shared/src/services/interface-state.js';

import * as CallHttp from './http/status.js';
import * as CallMock from './mock/status.js';

export const getPlayerStatus = () => {
  switch(interfaceState()) {
    case INTERFACE.HTTP:
      return CallHttp.getPlayerStatus();
    case INTERFACE.MOCK:
      return CallMock.getPlayerStatus();
    default:
      return invalidInterfaceState();
  }
};
