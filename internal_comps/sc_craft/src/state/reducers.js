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
      isCraftingBaseCardSelected: false
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
      craftingBaseCard: {},
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
    default:
      return state;
  }
};
