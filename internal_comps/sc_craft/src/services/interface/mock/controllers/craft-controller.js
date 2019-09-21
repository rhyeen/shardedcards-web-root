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
import { getCardCost } from '../../../cost-calculator.js';

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
  let slots = _getRandomMinionAbilitySlots(rarity, abilities);
  let card = {
    type: CARD_TYPES.MINION,
    rarity,
    range,
    health,
    attack,
    slots
  };
  card.cost = getCardCost(card);
  return card;
}

function _getGeneratedSpellBaseCard() {
  let rarity = _getRandomCardRarity();
  let abilities = _getRandomSpellAbilities(rarity);
  let slots = _getRandomSpellAbilitySlots(rarity, abilities);
  let card = {
    type: CARD_TYPES.SPELL,
    rarity,
    slots
  };
  card.cost = getCardCost(card);
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

function _getRandomMinionAbilitySlots(rarity, abilities) {
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
  _shuffleArray(slots);
  return _fillSlotsWithAbilities(slots, abilities);
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

function _getRandomSpellAbilitySlots(rarity, abilities) {
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
  _shuffleArray(slots);
  return _fillSlotsWithAbilities(slots, abilities);
}

/**
 * @TODO: make a helper function.
 */
function _shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function _fillSlotsWithAbilities(slots, abilities) {
  if (!slots.length || slots.length < abilities.length) {
    return [...abilities];
  }
  if (!abilities.length) {
    return [...slots];
  }
  let tempSlots = [...slots];
  for (let i = 0; i < abilities.length; i++) {
    tempSlots.splice(i, 1, abilities[i]);
  }
  return tempSlots;
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