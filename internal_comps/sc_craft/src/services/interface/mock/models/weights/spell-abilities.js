import { CARD_ABILITIES } from "../../../../../../../sc_shared/src/entities/card-keywords";

export const SpellAbilitiesWeights = {
  common: _getCommonSpellAbilitiesWeights()
}

function _getCommonSpellAbilitiesWeights() {
  return [
    {
      abilities: [],
      weight: 100
    },
    {
      abilities: [
        {
          id: CARD_ABILITIES.REACH
        }
      ],
      weight: 10
    },
    {
      abilities: [
        {
          id: CARD_ABILITIES.SPELLSHOT
        }
      ],
      weight: 10
    }
  ];
}