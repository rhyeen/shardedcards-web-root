import * as ActionType from './actions.js';
import { Log } from '../../../sc_shared/src/services/logger.js';

const INITIAL_STATE = _resetState();

function _resetState() {
  return {
    ui: {
      selectedCraftingPart: {
        craftingPartIndex: null,
        forgeSlotIndex: null
      },
      selectedForgeSlot: {
        forgeSlotIndex: null
      },
      isCraftingBaseCardSelected: false,
      isForgingCraftingBaseCard: false
    },
    entities: {
      forge: {
        slots: [
          {
            card: null
          },
          {
            card: null
          }
        ]
      },
      craftingBaseCard: null,
      craftingParts: []
    }
  };
}

function _setSelectedCraftingPart(state, craftingPartIndex, forgeSlotIndex) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedCraftingPart: {
        craftingPartIndex,
        forgeSlotIndex
      }
    }
  };
}

function _removeSelectedCraftingPart(state) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedCraftingPart: {
        craftingPartIndex: null,
        forgeSlotIndex: null
      }
    }
  };
}

function _setSelectedForgeSlot(state, forgeSlotIndex) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedForgeSlot: {
        forgeSlotIndex
      }
    }
  };
}

function _removeSelectedForgeSlot(state) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedForgeSlot: {
        forgeSlotIndex: null
      }
    }
  };
}

function _setIsCraftingBaseCardSelected(state, isCraftingBaseCardSelected) {
  return {
    ...state,
    ui: {
      ...state.ui,
      isCraftingBaseCardSelected
    }
  };
}

function _setIsForgingCraftingBaseCard(state, isForgingCraftingBaseCard) {
  return {
    ...state,
    ui: {
      ...state.ui,
      isForgingCraftingBaseCard
    }
  };
}

function _setForgeSlotCards(state, forgeSlotCards) {
  let newState = state;
  for (let i = 0; i < forgeSlotCards.length; i++) {
    newState = _setForgeSlotCard(state, i, forgeSlotCards[i]);
  }
  return newState;
}

function _setForgeSlotCard(state, forgeSlotIndex, forgeSlotCard) {
  let newState = _shallowCopyForgeSlots(state);
  newState.entities.forge.slots[forgeSlotIndex] = {
    ...newState.entities.forge.slots[forgeSlotIndex],
    card: forgeSlotCard
  };
  return newState;
}

function _shallowCopyForgeSlots(state) {
  return {
    ...state,
    entities: {
      ...state.entities,
      forge: {
        ...state.forge,
        slots: [...state.forge.slot]
      }
    }
  };
}

function _setCraftingBaseCard(state, craftingBaseCard) {
  return {
    ...state,
    entities: {
      ...state.entities,
      craftingBaseCard
    }
  };
}

function _setCraftingParts(state, craftingParts) {
  return {
    ...state,
    entities: {
      ...state.entities,
      craftingParts
    }
  };
}

export const sc_craft = (state = INITIAL_STATE, action) => {
  let newState;
  switch (action.type) {
    case ActionType.SELECT_CRAFTING_BASE_CARD:
      return _setIsCraftingBaseCardSelected(state, true);
    case ActionType.CANCEL_SELECT_CRAFTING_BASE_CARD:
      return _setIsCraftingBaseCardSelected(state, false);
    case ActionType.SELECT_FORGE_SLOT:
      return _setSelectedForgeSlot(state, action.forgeSlotIndex);
    case ActionType.CANCEL_SELECT_FORGE_SLOT:
      return _removeSelectedForgeSlot(state);
    case ActionType.SELECT_CRAFTING_PART:
      return _setSelectedCraftingPart(state, action.craftingPartIndex, null);
    case ActionType.CANCEL_SELECT_CRAFTING_PART:
      return _removeSelectedCraftingPart(state);
    case ActionType.SET_CRAFTING_BASE_CARD.SUCCESS:
      return _setCraftingBaseCard(state, action.craftingBaseCard);
    case ActionType.SET_CRAFTING_PARTS.SUCCESS:
      return _setCraftingParts(state, action.craftingParts);
    case ActionType.FORGE_SELECTED_CRAFTING_BASE_CARD:
      newState = state;
      newState = _setIsForgingCraftingBaseCard(newState, true);
      return _setIsCraftingBaseCardSelected(newState, false);
    case ActionType.CANCEL_FORGE_SELECTED_CRAFTING_BASE_CARD:
      return _setIsForgingCraftingBaseCard(state, false);
    case ActionType.FINISH_FORGE_SELECTED_CRAFTING_BASE_CARD:
      newState = state;
      newState = _setForgeSlotCard(newState, action.forgeSlotIndex, state.entities.craftingBaseCard);
      newState = _setIsForgingCraftingBaseCard(newState, false);
      return _setCraftingBaseCard(newState, null);
    default:
      return state;
  }
};
