import { Model } from '../models/model.js';
import { CARD_ABILITIES, CARD_RARITIES, CARD_TYPES } from '../../../../../../sc_shared/src/entities/card-keywords.js';
import { CRAFTING_PART_TYPES } from '../../../../entities/crafting-part.js';
import { Log } from '../../../../../../sc_shared/src/services/logger.js';
import { MinionStatsWeights } from '../models/weights/minion-stats.js';
import { CardTypeWeights } from '../models/weights/card-type.js';
import { CardRarityWeightRanges } from '../models/weights/card-rarity.js';
import { MinionAbilitiesWeights } from '../models/weights/minion-abilities.js';
import { MinionAbilitySlotsWeights } from '../models/weights/minion-ability-slots.js';
import { SpellAbilitiesWeights } from '../models/weights/spell-abilities.js';
import { SpellAbilitySlotsWeights } from '../models/weights/spell-ability-slots.js';
import * as CardsController from '../../../../../../sc_cards/src/services/interface/mock/controllers/cards-controller.js'; 
import { CraftingPartTypeWeights } from '../models/weights/crafting-part-type.js';
import { StatPartWeights } from '../models/weights/stat-part.js';
import { AbilityPartWeights } from '../models/weights/ability-part.js';

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
  let { range, health, attack } = _getRandomMinionStats(rarity);
  let abilities = _getRandomMinionAbilities(rarity);
  let slots = _getRandomMinionAbilitySlots(rarity, abilities.length);
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
  let abilities = _getRandomSpellAbilities(rarity);
  let slots = _getRandomSpellAbilitySlots(rarity, abilities.length);
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
  let weights = CardTypeWeights();
  return _selectChosenWeight(weights).type;
}

function _getRandomCardRarity() {
  let { remainingBacklogCards, initialBacklogCards } = CardsController.getBacklogStats();
  let initialAfterFieldFilled = initialBacklogCards - 3;
  let percentCompleted = 1 - (remainingBacklogCards / initialAfterFieldFilled);
  let computedWeights = _getComputedRarityWeights(percentCompleted);
  return _selectChosenWeight(computedWeights).rarity;
}

function _getComputedRarityWeights(percentCompleted) {
  let ranges = CardRarityWeightRanges();
  let weights = [];
  for (let range of ranges) {
    weights.push({
      ...range,
      weight: _getComputedRarityWeight(percentCompleted, range.range)
    });
  }
  return weights;
}

function _getComputedRarityWeight(percentCompleted, range) {
  for (let weight of range) {
    if (percentCompleted <= weight.percentCompleted) {
      return weight.weight;
    }
  }
  return range[range.length - 1].weight;
}

function _getRandomMinionStats(rarity) {
  let weights;
  switch (rarity) {
    case CARD_RARITIES.COMMON:
      weights = MinionStatsWeights.common();
      break;
    case CARD_RARITIES.RARE:
      weights = MinionStatsWeights.rare();
      break;
    case CARD_RARITIES.EPIC:
      weights = MinionStatsWeights.epic();
      break;
    case CARD_RARITIES.LEGENDARY:
      weights = MinionStatsWeights.legendary();
      break;
    default:
      Log.error(`unexpected rarity: ${rarity}`);
      weights = MinionStatsWeights.common();
  }
  return _selectChosenWeight(weights).stats;
}

function _getRandomMinionAbilities(rarity) {
  let weights;
  switch (rarity) {
    case CARD_RARITIES.COMMON:
      weights = MinionAbilitiesWeights.common();
      break;
    case CARD_RARITIES.RARE:
      weights = MinionAbilitiesWeights.rare();
      break;
    case CARD_RARITIES.EPIC:
      weights = MinionAbilitiesWeights.epic();
      break;
    case CARD_RARITIES.LEGENDARY:
      weights = MinionAbilitiesWeights.legendary();
      break;
    default:
      Log.error(`unexpected rarity: ${rarity}`);
      weights = MinionAbilitiesWeights.common();
  }
  return _selectChosenWeight(weights).abilities;
}

function _getRandomMinionAbilitySlots(rarity, abilityCount) {
  let weights;
  switch (rarity) {
    case CARD_RARITIES.COMMON:
      weights = MinionAbilitySlotsWeights.common();
      break;
    case CARD_RARITIES.RARE:
      weights = MinionAbilitySlotsWeights.rare();
      break;
    case CARD_RARITIES.EPIC:
      weights = MinionAbilitySlotsWeights.epic();
      break;
    case CARD_RARITIES.LEGENDARY:
      weights = MinionAbilitySlotsWeights.legendary();
      break;
    default:
      Log.error(`unexpected rarity: ${rarity}`);
      weights = MinionAbilitySlotsWeights.common();
  }
  let slots = _selectChosenWeight(weights).slots;
  return _removeAlreadyFilledSlots(slots, abilityCount);
}

function _getRandomSpellAbilities(rarity) {
  let weights;
  switch (rarity) {
    case CARD_RARITIES.COMMON:
      weights = SpellAbilitiesWeights.common();
      break;
    case CARD_RARITIES.RARE:
      weights = SpellAbilitiesWeights.rare();
      break;
    case CARD_RARITIES.EPIC:
      weights = SpellAbilitiesWeights.epic();
      break;
    case CARD_RARITIES.LEGENDARY:
      weights = SpellAbilitiesWeights.legendary();
      break;
    default:
      Log.error(`unexpected rarity: ${rarity}`);
      weights = SpellAbilitiesWeights.common();
  }
  return _selectChosenWeight(weights).abilities;
}

function _getRandomSpellAbilitySlots(rarity, abilityCount) {
  let weights;
  switch (rarity) {
    case CARD_RARITIES.COMMON:
      weights = SpellAbilitySlotsWeights.common();
      break;
    case CARD_RARITIES.RARE:
      weights = SpellAbilitySlotsWeights.rare();
      break;
    case CARD_RARITIES.EPIC:
      weights = SpellAbilitySlotsWeights.epic();
      break;
    case CARD_RARITIES.LEGENDARY:
      weights = SpellAbilitySlotsWeights.legendary();
      break;
    default:
      Log.error(`unexpected rarity: ${rarity}`);
      weights = SpellAbilitySlotsWeights.common();
  }
  let slots = _selectChosenWeight(weights).slots;
  return _removeAlreadyFilledSlots(slots, abilityCount);
}

function _removeAlreadyFilledSlots(slots, abilityCount) {
  if (!abilityCount) {
    return slots;
  }
  return slots.splice(-1, abilityCount);
}

function _getCardCost(card) {
  let cost = 0;
  switch (card.type) {
    case CARD_TYPES.MINION:
      cost = _getMinionCardCost(card);
      break;
    case CARD_TYPES.SPELL:
      cost = _getSpellCardCost(card);
      break;
    default:
      Log.error(`Unexpected card type: ${card.type}`);
  }
  cost += _getRarityCost(card.rarity);
  cost = Math.floor(cost);
  if (cost < 0) {
    cost = 0;
  }
  return cost;
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
  if (card.abilities.length) {
    for (let ability of card.abilities) {
      cost += _getAbilityCost(ability);
    }
  }
  cost += card.slots.length * 0.25;
  return cost;
}

function _getSpellCardCost(card) {
  if (card.abilities.length) {
    for (let ability of card.abilities) {
      cost += _getAbilityCost(ability);
    }
  }
  cost += card.slots.length * 0.25;
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

function _selectChosenWeight(weights) {
  let chosenWeight = _getWinningLotteryNumber(weights);
  let currentLowerboundWeight = 0;
  for (let weight of weights) {
    if (chosenWeight <= weight.weight + currentLowerboundWeight) {
      return weight;
    }
    currentLowerboundWeight += weight.weight;
  }
  Log.error('failed to find a weight associated with the winning lottery');
  return weights[0];
}

function _getWinningLotteryNumber(weights) {
  let totalWeights = 0;
  for (let weight of weights) {
    totalWeights += weight.weight;
  }
  return Math.random()*(totalWeights);
}

function _getGeneratedCraftingParts() {
  return [
    _getGeneratedCraftingPart(),
    _getGeneratedCraftingPart(),
    _getGeneratedCraftingPart()
  ];
}

function _getGeneratedCraftingPart() {
  let partType = _getRandomCraftingPartType();
  let rarity = _getRandomCardRarity();
  switch (partType) {
    case CRAFTING_PART_TYPES.ABILITY:
      return {
        ability: _getGeneratedAbilityPart(rarity),
        type: partType,
        rarity
      };
    case CRAFTING_PART_TYPES.STAT:
      return {
        stat: _getGeneratedStatPart(rarity),
        type: partType,
        rarity
      };
    default:
      Log.error(`unexpected card type: ${partType}`);
      return {
        ability: _getGeneratedAbilityPart(),
        type: CRAFTING_PART_TYPES.ABILITY,
        rarity
      };
  }
}

function _getRandomCraftingPartType() {
  let weights = CraftingPartTypeWeights();
  return _selectChosenWeight(weights).type;
}

function _getGeneratedAbilityPart(rarity) {
  let weights;
  switch (rarity) {
    case CARD_RARITIES.COMMON:
      weights = AbilityPartWeights.common();
      break;
    case CARD_RARITIES.RARE:
      weights = AbilityPartWeights.rare();
      break;
    case CARD_RARITIES.EPIC:
      weights = AbilityPartWeights.epic();
      break;
    case CARD_RARITIES.LEGENDARY:
      weights = AbilityPartWeights.legendary();
      break;
    default:
      Log.error(`unexpected rarity: ${rarity}`);
      weights = AbilityPartWeights.common();
  }
  return _selectChosenWeight(weights).ability;
}

function _getGeneratedStatPart(rarity) {
  let weights;
  switch (rarity) {
    case CARD_RARITIES.COMMON:
      weights = StatPartWeights.common();
      break;
    case CARD_RARITIES.RARE:
      weights = StatPartWeights.rare();
      break;
    case CARD_RARITIES.EPIC:
      weights = StatPartWeights.epic();
      break;
    case CARD_RARITIES.LEGENDARY:
      weights = StatPartWeights.legendary();
      break;
    default:
      Log.error(`unexpected rarity: ${rarity}`);
      weights = StatPartWeights.common();
  }
  return _selectChosenWeight(weights).stat;
}