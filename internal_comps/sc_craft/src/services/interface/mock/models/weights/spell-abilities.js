import { CARD_ABILITIES } from "../../../../../../../sc_shared/src/entities/card-keywords";
import { CRAFTING_PART_ABILITY_TIERS } from "../../../../../entities/crafting-part";

export const SpellAbilitiesWeights = {
  common: _getCommonWeights,
  rare: _getRareWeights,
  epic: _getEpicWeights,
  legendary: _getLegendaryWeights
}

function _getCommonWeights() {
  return [
    {
      abilities: [],
      weight: 100
    },
    {
      abilities: [
        {
          id: CARD_ABILITIES.REACH,
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_2,
          amount: 1
        }
      ],
      weight: 10
    },
    {
      abilities: [
        {
          id: CARD_ABILITIES.SPELLSHOT,
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_1,
          amount: 1
        }
      ],
      weight: 10
    }
  ];
}

function _getRareWeights() {
  return [
    {
      abilities: [],
      weight: 100
    },
    {
      abilities: [
        {
          id: CARD_ABILITIES.REACH,
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_2,
          amount: 1
        }
      ],
      weight: 15
    },
    {
      abilities: [
        {
          id: CARD_ABILITIES.REACH,
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_2,
          amount: 2
        }
      ],
      weight: 5
    },
    {
      abilities: [
        {
          id: CARD_ABILITIES.SPELLSHOT,
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_1,
          amount: 1
        }
      ],
      weight: 15
    },
    {
      abilities: [
        {
          id: CARD_ABILITIES.SPELLSHOT,
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_1,
          amount: 2
        }
      ],
      weight: 15
    },
    {
      abilities: [
        {
          id: CARD_ABILITIES.SPELLSHOT,
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_1,
          amount: 3
        }
      ],
      weight: 2
    }
  ];
}

function _getEpicWeights() {
  return [
    {
      abilities: [],
      weight: 100
    },
    {
      abilities: [
        {
          id: CARD_ABILITIES.REACH,
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_2,
          amount: 1
        }
      ],
      weight: 20
    },
    {
      abilities: [
        {
          id: CARD_ABILITIES.REACH,
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_2,
          amount: 2
        }
      ],
      weight: 10
    },
    {
      abilities: [
        {
          id: CARD_ABILITIES.SPELLSHOT,
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_1,
          amount: 2
        }
      ],
      weight: 20
    },
    {
      abilities: [
        {
          id: CARD_ABILITIES.SPELLSHOT,
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_1,
          amount: 5
        }
      ],
      weight: 5
    }
  ];
}

function _getLegendaryWeights() {
  return [
    {
      abilities: [],
      weight: 100
    },
    {
      abilities: [
        {
          id: CARD_ABILITIES.REACH,
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_2,
          amount: 1
        }
      ],
      weight: 30
    },
    {
      abilities: [
        {
          id: CARD_ABILITIES.REACH,
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_2,
          amount: 2
        }
      ],
      weight: 30
    },
    {
      abilities: [
        {
          id: CARD_ABILITIES.SPELLSHOT,
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_1,
          amount: 4
        }
      ],
      weight: 30
    },
    {
      abilities: [
        {
          id: CARD_ABILITIES.SPELLSHOT,
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_1,
          amount: 8
        }
      ],
      weight: 10
    },
    {
      abilities: [
        {
          id: CARD_ABILITIES.SPELLSHOT,
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_1,
          amount: 5
        },
        {
          id: CARD_ABILITIES.REACH,
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_2,
          amount: 2
        }
      ],
      weight: 5
    }
  ];
}