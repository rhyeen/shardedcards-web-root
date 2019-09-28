import { ACTION_TYPES } from "../../../../../../sc_shared/src/entities/turn-keywords";
import * as CraftingModel from '../../../../../../sc_craft/src/services/interface/mock/models/model.js';
import * as CardsModel from '../../../../../../sc_cards/src/services/interface/mock/models/model.js';
import { Log } from "../../../../../../sc_shared/src/services/logger";
import { getCardWithAddedCraftingPart } from "../../../../../../sc_craft/src/services/card-modifier";
import { buildCardDetails } from "../../../../../../sc_craft/src/services/card-builder";
import { getCardWithInstancesFromDetails, getCardInstances } from "../../../../../../sc_cards/src/services/interface/mock/models/initial-cards";

export const executeCraftingTurnActions = (turn) => {
  debugger;
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
  if (!_validForgeSlotIndex(action.forgeSlotIndex)) {
    Log.error(`invalid forgeSlotIndex: ${action.forgeSlotIndex}`);
    return false;
  }
  if (!CraftingModel.Model.craftingBaseCard) {
    Log.error(`craftingBaseCard already assigned to a forge slot`);
    return false;
  }
  CraftingModel.Model.forge.slots[action.forgeSlotIndex].card = CraftingModel.Model.craftingBaseCard;
  CraftingModel.Model.craftingBaseCard = null;
  return true;
}

function _validForgeSlotIndex(forgeSlotIndex) {
  return forgeSlotIndex >= 0 && forgeSlotIndex < CraftingModel.Model.forge.slots.length;
}

function _forgeSlotHasCard(forgeSlotIndex) {
  return !!CraftingModel.Model.forge.slots[forgeSlotIndex].card;
}

function _executeAddCraftingPart(action) {
  if (!_validForgeSlotIndex(action.forgeSlotIndex)) {
    Log.error(`invalid forgeSlotIndex: ${action.forgeSlotIndex}`);
    return false;
  }
  if (!_forgeSlotHasCard(action.forgeSlotIndex)) {
    Log.error(`forgeSlotIndex does not contain a card: ${action.forgeSlotIndex}`);
    return false;
  }
  if (!_validCraftingPartIndex(action.craftingPartIndex)) {
    Log.error(`invalid craftingPartIndex: ${action.craftingPartIndex}`);
    return false;
  }
  const { modifiedCard } = getCardWithAddedCraftingPart(CraftingModel.Model.forge.slots[action.forgeSlotIndex].card, CraftingModel.Model.craftingParts[action.craftingPartIndex]);
  CraftingModel.Model.forge.slots[action.forgeSlotIndex].card = modifiedCard;
  CraftingModel.Model.craftingParts.splice(action.craftingPartIndex, 1);
  return true;
}

function _validCraftingPartIndex(craftingPartIndex) {
  return craftingPartIndex >= 0 && craftingPartIndex < CraftingModel.Model.craftingParts.length;
}

function _executeAddCraftingCardToDeck(action) {
  if (!_validForgeSlotIndex(action.forgeSlotIndex)) {
    Log.error(`invalid forgeSlotIndex: ${action.forgeSlotIndex}`);
    return false;
  }
  if (!_forgeSlotHasCard(action.forgeSlotIndex)) {
    Log.error(`forgeSlotIndex does not contain a card: ${action.forgeSlotIndex}`);
    return false;
  }
  const cardDetails = buildCardDetails(CraftingModel.Model.forge.slots[action.forgeSlotIndex].card);
  debugger;
  console.trace('currently missing title + id');
  const card = _getCardFromDetails(cardDetails, action.numberOfInstances);
  _addCardsToDiscardPile(...card);
  CraftingModel.Model.forge.slots[action.forgeSlotIndex].card = null;
  return true;
}

function _getCardFromDetails(cardDetails, numberOfInstances) {
  let card = _getExistingCard(cardDetails);
  if (card) {
    return getCardInstances(card, numberOfInstances)
  }
  return getCardWithInstancesFromDetails(cardDetails, numberOfInstances);
}

function _getExistingCard(cardDetails) {
  if (cardDetails.id && cardDetails.id in CardsModel.Model.cards) {
    return CardsModel.Model.cards[cardDetails.id];
  }
  return null;
}

function _addCardsToDiscardPile(cardWithInstances) {
  for (let instanceId of cardWithInstances.instances) {
    _addCardToDiscardPile(card.title, instanceId);
  }
}

function _addCardToDiscardPile(id, instance) {
  CardsModel.Model.player.discardPile.cards.push({
    id,
    instance
  });
}