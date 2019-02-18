const COMPONENT_TAG = 'SR_CRAFT';

/**
 * Base structure derived from: 
 * https://github.com/redux-saga/redux-saga/blob/master/examples/real-world/_actions/index.js
 */
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function _createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${COMPONENT_TAG}_${base}_${type}`;
		return acc;
	}, {})
}

function _createRequestRaw(base) {
  return `${COMPONENT_TAG}_${base}`;
}

function _action(type, payload = {}) {
  return {type, ...payload};
}

export const SELECT_CRAFTING_BASE_CARD = _createRequestRaw('SELECT_CRAFTING_BASE_CARD');
export const selectCraftingBaseCard = () => _action(SELECT_CRAFTING_BASE_CARD, {});

export const CANCEL_SELECT_CRAFTING_BASE_CARD = _createRequestRaw('CANCEL_SELECT_CRAFTING_BASE_CARD');
export const cancelSelectCraftingBaseCard = () => _action(CANCEL_SELECT_CRAFTING_BASE_CARD, {});

export const SELECT_FORGE_SLOT = _createRequestRaw('SELECT_FORGE_SLOT');
export const selectForgeSlot = (forgeSlotIndex) => _action(SELECT_FORGE_SLOT, {forgeSlotIndex});

export const CANCEL_SELECT_FORGE_SLOT = _createRequestRaw('CANCEL_SELECT_FORGE_SLOT');
export const cancelSelectForgeSlot = () => _action(CANCEL_SELECT_FORGE_SLOT, {});

export const FINISH_FORGING_CARD = _createRequestTypes('FINISH_FORGING_CARD');
export const finishForgingCard = {
  request: () => _action(FINISH_FORGING_CARD.REQUEST, {}),
  success: () => _action(FINISH_FORGING_CARD.SUCCESS, {})
};

export const SELECT_CRAFTING_PART = _createRequestRaw('SELECT_CRAFTING_PART');
export const selectCraftingPart = (craftingPartIndex) => _action(SELECT_CRAFTING_PART, {craftingPartIndex});

export const CANCEL_SELECT_CRAFTING_PART = _createRequestRaw('CANCEL_SELECT_CRAFTING_PART');
export const cancelSelectCraftingPart = () => _action(CANCEL_SELECT_CRAFTING_PART, {});

export const SET_CRAFTING_BASE_CARD = _createRequestTypes('SET_CRAFTING_BASE_CARD');
export const setCraftingBaseCard = {
  request: () => _action(SET_CRAFTING_BASE_CARD.REQUEST, {}),
  success: (craftingBaseCard) => _action(SET_CRAFTING_BASE_CARD.SUCCESS, {craftingBaseCard})
};

export const SET_CRAFTING_PARTS = _createRequestTypes('SET_CRAFTING_PARTS');
export const setCraftingParts = {
  request: () => _action(SET_CRAFTING_PARTS.REQUEST, {}),
  success: (craftingParts) => _action(SET_CRAFTING_PARTS.SUCCESS, {craftingParts})
};

export const FORGE_SELECTED_CRAFTING_BASE_CARD = _createRequestRaw('FORGE_SELECTED_CRAFTING_BASE_CARD');
export const forgeSelectedCraftingBaseCard = () => _action(FORGE_SELECTED_CRAFTING_BASE_CARD, {});

export const CANCEL_FORGE_SELECTED_CRAFTING_BASE_CARD = _createRequestRaw('CANCEL_FORGE_SELECTED_CRAFTING_BASE_CARD');
export const cancelForgeSelectedCraftingBaseCard = () => _action(CANCEL_FORGE_SELECTED_CRAFTING_BASE_CARD, {});

export const FINISH_FORGE_SELECTED_CRAFTING_BASE_CARD = _createRequestRaw('FINISH_FORGE_SELECTED_CRAFTING_BASE_CARD');
export const finishForgeSelectedCraftingBaseCard = (forgeSlotIndex) => _action(FINISH_FORGE_SELECTED_CRAFTING_BASE_CARD, {forgeSlotIndex});
