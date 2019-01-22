import { CARD_TYPES } from "../../../../../../../sc_shared/src/entities/card-keywords";

export const CardTypeWeights = () => [
  {
    type: CARD_TYPES.MINION,
    weight: 3
  },
  {
    type: CARD_TYPES.SPELL,
    weight: 1
  }
];