import { getCardCost } from "./cost-calculator";
import { CRAFTING_PART_TYPES, canFitInSlot } from "../entities/crafting-part";
import { CARD_TYPES, CARD_STATS } from "../../../sc_shared/src/entities/card-keywords";

export function getCardWithAddedCraftingPart(forgeCard, craftingPart) {
  const returnArgs = {
    modifiedCard: {...forgeCard},
    cardWasModified: false
  };
  if (_craftingPartFitsInSlot(forgeCard, craftingPart)) {
    const matchingSlot = _getMatchingSlot(forgeCard, craftingPart);
    if (matchingSlot !== -1) {
      returnArgs.modifiedCard.slots = [...forgeCard.slots];
      returnArgs.modifiedCard.slots[matchingSlot] = _getModifiedSlot(forgeCard.slots[matchingSlot], craftingPart);
      returnArgs.cardWasModified = true;
    } else {
      const fittedSlot = _getFittedSlot(forgeCard, craftingPart);
      if (fittedSlot !== -1) {
        returnArgs.modifiedCard.slots = [...forgeCard.slots];
        returnArgs.modifiedCard.slots[fittedSlot] = _getFilledSlot(forgeCard.slots[fittedSlot], craftingPart);
        returnArgs.cardWasModified = true;
      }
    }
  } else {
    if (_canModifyAttack(forgeCard, craftingPart)) {
      returnArgs.modifiedCard.attack = _modifyAttack(forgeCard, craftingPart);
      returnArgs.cardWasModified = true;
    }
    if (_canModifyRange(forgeCard, craftingPart)) {
      returnArgs.modifiedCard.range = _modifyRange(forgeCard, craftingPart);
      returnArgs.cardWasModified = true;
    }
    if (_canModifyHealth(forgeCard, craftingPart)) {
      returnArgs.modifiedCard.health = _modifyHealth(forgeCard, craftingPart);
      returnArgs.cardWasModified = true;
    }
  }
  if (returnArgs.cardWasModified) {
    returnArgs.modifiedCard.cost = getCardCost(returnArgs.modifiedCard);
  }
  return returnArgs;
}

function _craftingPartFitsInSlot(card, craftingPart) {
  if (!card.slots.length) {
    return false;
  }
  return craftingPart.type !== CRAFTING_PART_TYPES.STAT;
}

function _getMatchingSlot(card, craftingPart) {
  if (!card.slots.length) {
    return -1;
  }
  for (let i = 0; i < card.slots.length; i++) {
    if (_slotCanBeModified(card.slots[i], craftingPart)) {
      return i;
    }
  }
  return -1;
}

function _slotCanBeModified(slot, craftingPart) {
  if (!slot.id) {
    return false;
  }
  if (slot.id !== craftingPart.id) {
    return false;
  }
  if (!slot.amount || !craftingPart.amount) {
    return false;
  }
  return true;
}

function _getModifiedSlot(slot, craftingPart) {
  if (!_slotCanBeModified(slot, craftingPart)) {
    return slot;
  }
  return { 
    ...slot,
    amount: slot.amount + craftingPart.amount
  };
}

function _getFittedSlot(card, craftingPart) {
  if (!card.slots.length) {
    return -1;
  }
  for (let i = 0; i < card.slots.length; i++) {
    if (_partFitsSlot(card.slots[i], craftingPart)) {
      return i;
    }
  }
  return -1;
}

function _getFilledSlot(slot, craftingPart) {
  if (!_partFitsSlot(slot, craftingPart)) {
    return slots;
  }
  return { ...craftingPart.ability };
}

function _partFitsSlot(slot, craftingPart) {
  // slot already filled
  if (slot.id) {
    return false;
  }
  return canFitInSlot(craftingPart.ability.tier, slot.tier);
}

function _canModifyAttack(card, craftingPart) {
  if (card.type !== CARD_TYPES.MINION) {
    return false;
  }
  return craftingPart.id === CARD_STATS.ATTACK;
}

function _modifyAttack(card, craftingPart) {
  if (!_canModifyAttack(card, craftingPart)) {
    return card.attack;
  }
  return card.attack + craftingPart.amount;
}

function _canModifyRange(card, craftingPart) {
  if (card.type !== CARD_TYPES.MINION) {
    return false;
  }
  return craftingPart.id === CARD_STATS.RANGE;
}

function _modifyRange(card, craftingPart) {
  if (!_canModifyRange(card, craftingPart)) {
    return card.range;
  }
  return card.range + craftingPart.amount;
}

function _canModifyHealth(card, craftingPart) {
  if (card.type !== CARD_TYPES.MINION) {
    return false;
  }
  return craftingPart.id === CARD_STATS.HEALTH;
}

function _modifyHealth(card, craftingPart) {
  if (!_canModifyHealth(card, craftingPart)) {
    return card.health;
  }
  return card.health + craftingPart.amount;
}
