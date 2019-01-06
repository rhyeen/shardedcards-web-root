import { Http } from '../../../../../sc_shared/src/services/http.js';

export const getCraftingBaseCard = () => {
  return Http.post('craft/craftingbasecard');
}

export const getCraftingParts = () => {
  return Http.post('craft/craftingparts');
}

