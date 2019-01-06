import { Log } from '../../../../../../sc_shared/src/services/logger.js';

export const Model = _getInitialModel();

function _getInitialModel() {
  return {
    craftingBaseCard: null,
    craftingParts: []
  };
}

export function initializeModel() {
  let model = _getInitialModel();
  Model.craftingBaseCard = model.craftingBaseCard;
  Model.craftingParts = [...model.craftingParts];
}
