import { CARD_ABILITIES } from "../../../../../../../sc_shared/src/entities/card-keywords";

export const MinionAbilitiesWeights = {
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
          id: CARD_ABILITIES.HASTE
        }
      ],
      weight: 5
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
          id: CARD_ABILITIES.HASTE
        }
      ],
      weight: 10
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
          id: CARD_ABILITIES.HASTE
        }
      ],
      weight: 15
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
          id: CARD_ABILITIES.HASTE
        }
      ],
      weight: 25
    }
  ];
}