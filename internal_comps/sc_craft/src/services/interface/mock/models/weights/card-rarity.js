import { CARD_RARITIES } from "../../../../../../../sc_shared/src/entities/card-keywords";

export const CardRarityWeightRanges = () => [
  {
    rarity: CARD_RARITIES.COMMON,
    range: [
      {
        percentCompleted: 0,
        weight: 80
      },
      {
        percentCompleted: .4,
        weight: 25
      },
      {
        percentCompleted: .9,
        weight: 0
      }
    ]
  },
  {
    rarity: CARD_RARITIES.RARE,
    range: [
      {
        percentCompleted: 0,
        weight: 5
      },
      {
        percentCompleted: .2,
        weight: 5
      },
      {
        percentCompleted: .4,
        weight: 40
      },
      {
        percentCompleted: 1,
        weight: 10
      }
    ]
  },
  {
    rarity: CARD_RARITIES.EPIC,
    range: [
      {
        percentCompleted: 0,
        weight: 1
      },
      {
        percentCompleted: .4,
        weight: 5
      },
      {
        percentCompleted: .6,
        weight: 40
      },
      {
        percentCompleted: 1,
        weight: 20
      }
    ]
  },
  {
    rarity: CARD_RARITIES.LEGENDARY,
    range: [
      {
        percentCompleted: 0,
        weight: 0.1
      },
      {
        percentCompleted: .6,
        weight: 1
      },
      {
        percentCompleted: .8,
        weight: 10
      },
      {
        percentCompleted: 1,
        weight: 15
      }
    ]
  }
];