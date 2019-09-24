import { ACTION_TYPES } from "../../../../../../sc_shared/src/entities/turn-keywords";

export const executeCraftingTurnActions = (turn) => {
  for (let action of turn) {
    let validAction = _executeAction(action);
    if (!validAction) {
      return false;
    }
  }
  return true;
}

function _executeAction(action) {
  if (!action.type) {
    Log.error(`No action.type given`);
    return false;
  }
  switch (action.type) {
    case ACTION_TYPES.CRAFT_BASE_CARD:
      return _executeCraftBaseCard(action);
    case ACTION_TYPES.ADD_CRAFTING_PART:
      return _executeAddCraftingPart(action);
    case ACTION_TYPES.ADD_CRAFTED_CARD_TO_DECK:
      return _executeAddCraftingCardToDeck(action);
    default:
      Log.error(`Unexpected action type: ${action.type}`);
      return false;
  }
}

function _executeCraftBaseCard(action) {
  /*
    {
      "type": "craftBaseCard",
      "forgeSlotIndex": 1
    },
  */
  console.trace('TODO');
}

function _executeAddCraftingPart(action) {
  /*
    {
      "type": "addCraftingPart",
      "craftingPartIndex": 0,
      "forgeSlotIndex": 1
    },
  */
  console.trace('TODO');
}

function _executeAddCraftingCardToDeck(action) {
  /*
    {
      "type": "addCraftedCardToDeck",
      "numberOfInstances": 5,
      "forgeSlotIndex": 1
    }
  */
  console.trace('TODO');
}