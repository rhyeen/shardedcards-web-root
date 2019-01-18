import { CARD_RARITIES } from "../../../../../../../sc_shared/src/entities/card-keywords";

export const CardRarityWeightRanges = [
  {
    type: CARD_RARITIES.COMMON,
    range: [
      {
        percentComplete: 0,
        weight: 80
      },
      {
        percentComplete: .4,
        weight: 25
      },
      {
        percentComplete: .9,
        weight: 0
      }
    ]
  },
  {
    type: CARD_RARITIES.RARE,
    range: [
      {
        percentComplete: 0,
        weight: 5
      },
      {
        percentComplete: .2,
        weight: 5
      },
      {
        percentComplete: .4,
        weight: 40
      },
      {
        percentComplete: 1,
        weight: 10
      }
    ]
  },
  {
    type: CARD_RARITIES.EPIC,
    range: [
      {
        percentComplete: 0,
        weight: 1
      },
      {
        percentComplete: .4,
        weight: 5
      },
      {
        percentComplete: .6,
        weight: 40
      },
      {
        percentComplete: 1,
        weight: 20
      }
    ]
  },
  {
    type: CARD_RARITIES.LEGENDARY,
    range: [
      {
        percentComplete: 0,
        weight: 0.1
      },
      {
        percentComplete: .6,
        weight: 1
      },
      {
        percentComplete: .8,
        weight: 10
      },
      {
        percentComplete: 1,
        weight: 15
      }
    ]
  }
];