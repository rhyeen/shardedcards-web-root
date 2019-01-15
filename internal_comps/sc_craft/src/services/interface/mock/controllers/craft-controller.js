import { Model } from '../models/model.js';
import { CARD_ABILITIES, CARD_RARITIES, CARD_TYPES } from '../../../../../../sc_shared/src/entities/card-keywords.js';
import { CRAFTING_PART_TYPES } from '../../../../entities/crafting-part.js';
import { Log } from '../../../../../../sc_shared/src/services/logger.js';

export const prepareCraftingTurn = () => {
  Model.craftingBaseCard = _getGeneratedCraftingBaseCard();
  Model.craftingParts = _getGeneratedCraftingParts();
};

function _getGeneratedCraftingBaseCard() {
  let cardType = _getRandomCardType();
  switch (cardType) {
    case CARD_TYPES.MINION:
      return _getGeneratedMinionBaseCard();
    case CARD_TYPES.SPELL:
      return _getGeneratedSpellBaseCard();
    default:
      Log.error(`unexpected card type: ${cardType}`);
      return _getGeneratedMinionBaseCard();
  }
}

function _getGeneratedMinionBaseCard() {
  let rarity = _getRandomCardRarity();
  let { range, health, attack } = _getRandomMinionStats();
  let abilities = _getRandomMinionAbilities();
  let slots = _getRandomMinionAbilitySlots(abilities.length);
  let card = {
    type: CARD_TYPES.MINION,
    rarity,
    range,
    health,
    attack,
    abilities,
    slots
  };
  card.cost = _getCardCost(card);
  return card;
}

function _getGeneratedSpellBaseCard() {
  let rarity = _getRandomCardRarity();
  let abilities = _getRandomSpellAbilities();
  let slots = _getRandomSpellAbilitySlots(abilities.length);
  let card = {
    type: CARD_TYPES.MINION,
    rarity,
    abilities,
    slots
  };
  card.cost = _getCardCost(card);
  return card;
}

function _getRandomCardType() {
  let weights = _getCardTypeLotteryWeights();
  return _selectChosenWeight(weights).type;
}

function _getCardTypeLotteryWeights() {
  return [
    {
      type: CARD_TYPES.MINION,
      weight: 3
    },
    {
      type: CARD_TYPES.SPELL,
      weight: 1
    }
  ];
}

function _getRandomCardRarity() {
  return CARD_RARITIES.COMMON;
}

function _getRandomMinionStats() {
  let results = {
    range: 1,
    attack: 1,
    health: 1
  };
  return results;
}

function _getRandomMinionAbilities() {
  return [];
}

function _getRandomMinionAbilitySlots(abilityCount) {
  return [];
}

function _getRandomSpellAbilities() {
  return [];
}

function _getRandomSpellAbilitySlots(abilityCount) {
  return [];
}

function _selectChosenWeight(weights) {
  let normalizedWeights = _getNormalizedWeights(weights);
  let chosenWeight = _getWeightWinningLottery(weights);
  let currentLowerboundWeight = 0;
  for (let i; i < normalizedWeights.length; i++) {
    if (normalizedWeights[i] + currentLowerboundWeight <= chosenWeight) {
      return weights[i];
    }
    currentLowerboundWeight += normalizedWeights[i];
  }
  Log.error('failed to find a weight associated with the winning lottery');
  return weights[0];
}

/**
 * Normalized weights would be such that the smallest weight is always 1 (or very very close).
 */
function _getNormalizedWeights(weights) {
  let smallestWeight = _getSmallestWeight(weights);
  let normalizedWeights = weights.map(weight => 1/smallestWeight * weight.weight);
  return normalizedWeights; 
}

function _getSmallestWeight(weights) {
  if (!weights.length) {
    Log.error('cannot get smallest of no weights');
    return 1;
  }
  smallestWeight = weights[0].weight;
  for (let weight of weights) {
    if (weight.weight < smallestWeight) {
      smallestWeight = weight.weight;
    }
  }
  if (smallestWeight <= 0) {
    Log.error('cannot have a weight <= 0');
    return 1;
  }
  return smallestWeight;
}

function _getWeightWinningLottery(weights) {
  let totalWeights = weights.reduce((total, weight) => total + weight.weight);
  return Math.floor(Math.random()*(totalWeights)) + 1;
}

function _getGeneratedCraftingParts() {
  return [
    {
      type: CRAFTING_PART_TYPES.ABILITY,
      ability: {
        id: CARD_ABILITIES.SPELLSHOT,
        amount: 1
      }
    },
    {
      type: CRAFTING_PART_TYPES.ABILITY,
      ability: {
        id: CARD_ABILITIES.HASTE
      }
    },
    {
      type: CRAFTING_PART_TYPES.ABILITY,
      ability: {
        id: CARD_ABILITIES.REACH,
        amount: 1
      }
    }
  ];
}