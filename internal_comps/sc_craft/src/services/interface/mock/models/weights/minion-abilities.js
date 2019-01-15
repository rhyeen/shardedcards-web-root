import { CARD_ABILITIES } from "../../../../../../../sc_shared/src/entities/card-keywords";

export const MinionAbilitiesWeights = {
  common: _getCommonMinionAbilitiesWeights()
}

function _getCommonMinionAbilitiesWeights() {
  return [
    {
      abilities: [],
      weight: 100
    },
    {
      abilities: [
        {
          id: CARD_ABILITIES.HASTE
        }
      ],
      weight: 5
    }
  ];
}