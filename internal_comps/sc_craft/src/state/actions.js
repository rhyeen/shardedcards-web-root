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

export const SELECT_CRAFTING_PART = _createRequestRaw('SELECT_CRAFTING_PART');
export const selectCraftingPart = (craftingPartIndex) => _action(SELECT_CRAFTING_PART, {craftingPartIndex});

export const CANCEL_SELECT_CRAFTING_PART = _createRequestRaw('CANCEL_SELECT_CRAFTING_PART');
export const cancelSelectCraftingPart = () => _action(CANCEL_SELECT_CRAFTING_PART, {});
