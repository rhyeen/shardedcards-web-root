import { createSelector } from 'reselect';

const _forgeSelector = state => state.sc_craft.entities.forge;
const _craftingBaseCardSelector = state => state.sc_craft.entities.craftingBaseCard;
const _craftingPartsSelector = state => state.sc_craft.entities.craftingParts;

export const getForgeSlots = createSelector(
  _forgeSelector,
  (forge) => {
    return forge.slots;
  }
);

export const getCraftingBaseCard = createSelector(
  _craftingBaseCardSelector,
  (craftingBaseCard) => {
    return craftingBaseCard;
  }
);

export const getCraftingParts = createSelector(
  _craftingPartsSelector,
  (craftingParts) => {
    return craftingParts;
  }
);

export const emptyForgeSlots = createSelector(
  _forgeSelector,
  (forge) => {
    for (let slot of forge.slots) {
      if (slot.card) {
        return false;
      }
    }
    return true;
  }
);