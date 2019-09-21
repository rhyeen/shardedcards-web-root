import { createSelector } from 'reselect';

const _forgeSelector = state => state.sc_craft.entities.forge;
const _craftingBaseCardSelector = state => state.sc_craft.entities.craftingBaseCard;
const _craftingPartsSelector = state => state.sc_craft.entities.craftingParts;
const _isCraftingBaseCardSelectedSelector = state => state.sc_craft.ui.isCraftingBaseCardSelected;
const _isForgingCraftingBaseCardSelector = state => state.sc_craft.ui.isForgingCraftingBaseCard;
const _selectedForgeSlotSelector = state => state.sc_craft.ui.selectedForgeSlot;
const _selectedCraftingPart = state => state.sc_craft.ui.selectedCraftingPart;
const _craftingPartsUsed = state => state.sc_craft.entities.craftingPartsUsed;
const _maxCraftingPartsUsed = state => state.sc_craft.entities.maxCraftingPartsUsed;
const _finishedForgeCard = state => state.sc_craft.ui.finishedForgeCard;

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

export const getCraftingPartsLeftToUse = createSelector(
  _craftingPartsUsed,
  _maxCraftingPartsUsed,
  (craftingPartsUsed, maxCraftingPartsUsed) => {
    return maxCraftingPartsUsed - craftingPartsUsed;
  }
);

export const isCraftingBaseCardSelected = createSelector(
  _isCraftingBaseCardSelectedSelector,
  (isCraftingBaseCardSelected) => isCraftingBaseCardSelected
);

export const isForgingCraftingBaseCard = createSelector(
  _isForgingCraftingBaseCardSelector,
  (isForgingCraftingBaseCard) => isForgingCraftingBaseCard
);

export const getFinishedForgeCard = createSelector(
  _finishedForgeCard,
  (finishedForgeCard) => finishedForgeCard
);

export const getSelectedForgeSlotCardSelector = createSelector(
  _selectedForgeSlotSelector,
  _forgeSelector,
  (selectedForgeSlotSelector, forgeSelector) => {
    if (!selectedForgeSlotSelector.forgeSlotIndex && selectedForgeSlotSelector.forgeSlotIndex !== 0) {
      return {
        forgeSlotIndex: null,
        card: null
      };
    }
    return {
      forgeSlotIndex: selectedForgeSlotSelector.forgeSlotIndex,
      ...forgeSelector.slots[selectedForgeSlotSelector.forgeSlotIndex]
    };
  }
);

export const getSelectedCraftingPartSelector = createSelector(
  _selectedCraftingPart,
  _forgeSelector,
  _craftingPartsSelector,
  (selectedCraftingPart, forgeSelector, craftingPartsSelector) => {
    let forgeSlot = null;
    let craftingPart = null;
    if (selectedCraftingPart.forgeSlotIndex === 0 || selectedCraftingPart.forgeSlotIndex > 0) {
      forgeSlot = { ...forgeSelector.slots[selectedCraftingPart.forgeSlotIndex] };
    }
    if (selectedCraftingPart.craftingPartIndex === 0 || selectedCraftingPart.craftingPartIndex > 0) {
      craftingPart = { ...craftingPartsSelector[selectedCraftingPart.craftingPartIndex] };
    }
    return {
      ...selectedCraftingPart,
      forgeSlot,
      craftingPart,
    };
  }
);