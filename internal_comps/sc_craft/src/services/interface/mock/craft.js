import { 
  Mock,
  CALLBACK_TIME } from '../../../../../sc_shared/src/services/mock.js';

import { Model } from './models/model.js';

export const getCraftingBaseCard = () => {
  return new Promise((resolve) => {
    Mock.debugRequest(getCraftingBaseCard);
    setTimeout(() => {
      let response = {
        craftingBaseCard: Model.craftingBaseCard
      };
      Mock.debugSuccessfulResponse(getCraftingBaseCard, response);
      resolve(Mock.prepareResponse(response));
    }, CALLBACK_TIME.GET);
  });
};

export const getCraftingParts = () => {
  return new Promise((resolve) => {
    Mock.debugRequest(getCraftingParts);
    setTimeout(() => {
      let response = {
        craftingParts: Model.craftingParts
      };
      Mock.debugSuccessfulResponse(getCraftingParts, response);
      resolve(Mock.prepareResponse(response));
    }, CALLBACK_TIME.GET);
  });
};
