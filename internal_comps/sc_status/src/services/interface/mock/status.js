import { 
  Mock,
  CALLBACK_TIME } from '../../../../../sc_shared/src/services/mock.js';

import { Model } from './models/model.js';

export const getPlayerStatus = () => {
  return new Promise((resolve) => {
    Mock.debugRequest(getPlayerStatus);
    setTimeout(() => {
      let response = {
        player: Model.player
      };
      Mock.debugSuccessfulResponse(getPlayerStatus, response);
      resolve(Mock.prepareResponse(response));
    }, CALLBACK_TIME.GET);
  });
};
