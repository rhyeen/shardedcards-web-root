import { CARD_TYPES, CARD_ABILITIES, CARD_RARITIES } from "../../../sc_shared/src/entities/card-keywords";

export function getCardCost(forgeCard) {
  let cost = _getCardTypeSpecificCosts(forgeCard);
  cost += _getRarityCost(forgeCard.rarity);
  // @NOTE: we don't want to floor() since we need approximations while still crafting.
  // cost = Math.floor(cost);
  if (cost < 0) {
    cost = 0;
  }
  return cost;
}

function _getCardTypeSpecificCosts(card) {
  switch (card.type) {
    case CARD_TYPES.MINION:
      return _getMinionCardCost(card);
    case CARD_TYPES.SPELL:
      return _getSpellCardCost(card);
    default:
      Log.error(`Unexpected card type: ${card.type}`);
      return 0;
  }
}

function _getMinionCardCost(card) {
  let cost = 0;
  cost += card.attack * 0.3;
  if (card.range === 0) {
    cost += -1;
  } else if (card.range === 1) {
    cost += 0;
  } else if (card.range === 2) {
    cost += 2;
  } else if (card.range === 3) {
    cost += 3;
  }
  cost += card.health * 0.25;
  cost += _getAbilitiesCost(card);
  cost += card.slots.length * 0.25;
  return cost;
}

function _getSpellCardCost(card) {
  let cost = 0;
  cost += _getAbilitiesCost(card);
  cost += card.slots.length * 0.25;
  return cost;
}

function _getAbilitiesCost(card) {
  let cost = 0;
  if (card.slots.length) {
    for (let slot of card.slots) {
      if (slot.id) {
        cost += _getAbilityCost(slot);
      }
    }
  }
  return cost;
}

function _getAbilityCost(ability) {
  switch (ability.id) {
    case CARD_ABILITIES.REACH:
      return _getAbilityReachCost(ability);
    case CARD_ABILITIES.HASTE:
      return _getAbilityHasteCost(ability);
    case CARD_ABILITIES.SPELLSHOT:
      return _getAbilitySpellshotCost(ability);
    default:
      Log.error(`unexpected ability: ${ability.id}`);
      return 0;
  }
}

function _getAbilityReachCost(ability) {
  return ability.amount * 3;
}

function _getAbilityHasteCost(ability) {
  return 1.5;
}

function _getAbilitySpellshotCost(ability) {
  return ability.amount * 2;
}

function _getRarityCost(rarity) {
  switch (rarity) {
    case CARD_RARITIES.COMMON:
      return 0;
    case CARD_RARITIES.RARE:
      return -.5;
    case CARD_RARITIES.EPIC:
      return -1;
    case CARD_RARITIES.LEGENDARY:
      return -2;
    default:
      Log.error(`unexpected rarity: ${rarity}`);
      return 0;
  }
}