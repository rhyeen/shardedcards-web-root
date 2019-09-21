import { CRAFTING_PART_ABILITY_TIERS } from "../../../../../entities/crafting-part";

export const SpellAbilitySlotsWeights = {
  common: _getCommonWeights,
  rare: _getRareWeights,
  epic: _getEpicWeights,
  legendary: _getLegendaryWeights
}

function _getCommonWeights() {
  return [
    {
      slots: [
        {
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_1
        },
        {
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_1
        },
        {
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_1
        }
      ],
      weight: 100
    }
  ];
}

function _getRareWeights() {
  return [
    {
      slots: [],
      weight: 20
    },
    {
      slots: [
        {
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_1
        }
      ],
      weight: 50
    },
    {
      slots: [
        {
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_1
        },
        {
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_1
        }
      ],
      weight: 50
    },
    {
      slots: [
        {
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_2
        }
      ],
      weight: 50
    },
    {
      slots: [
        {
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_2
        },
        {
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_2
        }
      ],
      weight: 10
    }
  ];
}

function _getEpicWeights() {
  return [
    {
      slots: [
        {
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_1
        },
        {
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_1
        }
      ],
      weight: 50
    },
    {
      slots: [
        {
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_2
        },
        {
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_2
        }
      ],
      weight: 50
    },
    {
      slots: [
        {
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_3
        }
      ],
      weight: 50
    },
    {
      slots: [
        {
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_3
        },
        {
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_3
        }
      ],
      weight: 10
    }
  ];
}

function _getLegendaryWeights() {
  return [
    {
      slots: [
        {
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_2
        },
        {
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_2
        }
      ],
      weight: 50
    },
    {
      slots: [
        {
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_3
        },
        {
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_3
        }
      ],
      weight: 50
    },
    {
      slots: [
        {
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_4
        }
      ],
      weight: 50
    },
    {
      slots: [
        {
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_4
        },
        {
          tier: CRAFTING_PART_ABILITY_TIERS.SPELL.TIER_4
        }
      ],
      weight: 10
    }
  ];
}