import { CARD_ABILITIES } from "../../../../../../../sc_shared/src/entities/card-keywords";
import { CRAFTING_PART_ABILITY_TIERS } from "../../../../../entities/crafting-part";

export const AbilityPartWeights = {
  common: _getCommonWeights,
  rare: _getRareWeights,
  epic: _getEpicWeights,
  legendary: _getLegendaryWeights
}

function _getCommonWeights() {
  return [
    {
      ability: {
        id: CARD_ABILITIES.REACH,
        tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_2,
        amount: 1
      },
      weight: 80
    },
    {
      ability: {
        id: CARD_ABILITIES.SPELLSHOT,
        tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_1,
        amount: 1
      },
      weight: 100
    },
    {
      ability: {
        id: CARD_ABILITIES.HASTE,
        tier: CRAFTING_PART_ABILITY_TIERS.MINION.TIER_1
      },
      weight: 10
    }
  ];
}

function _getRareWeights() {
  return [
    {
      ability: {
        id: CARD_ABILITIES.REACH,
        tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_2,
        amount: 1
      },
      weight: 80
    },
    {
      ability: {
        id: CARD_ABILITIES.SPELLSHOT,
        tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_1,
        amount: 1
      },
      weight: 100
    },
    {
      ability: {
        id: CARD_ABILITIES.HASTE,
        tier: CRAFTING_PART_ABILITY_TIERS.MINION.TIER_1
      },
      weight: 10
    }
  ];
}

function _getEpicWeights() {
  return [
    {
      ability: {
        id: CARD_ABILITIES.REACH,
        tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_2,
        amount: 1
      },
      weight: 80
    },
    {
      ability: {
        id: CARD_ABILITIES.SPELLSHOT,
        tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_1,
        amount: 1
      },
      weight: 100
    },
    {
      ability: {
        id: CARD_ABILITIES.HASTE,
        tier: CRAFTING_PART_ABILITY_TIERS.MINION.TIER_1
      },
      weight: 10
    }
  ];
}

function _getLegendaryWeights() {
  return [
    {
      ability: {
        id: CARD_ABILITIES.REACH,
        tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_2,
        amount: 1
      },
      weight: 80
    },
    {
      ability: {
        id: CARD_ABILITIES.SPELLSHOT,
        tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_1,
        amount: 1
      },
      weight: 100
    },
    {
      ability: {
        id: CARD_ABILITIES.HASTE,
        tier: CRAFTING_PART_ABILITY_TIERS.MINION.TIER_1
      },
      weight: 10
    }
  ];
}