import { CARD_ABILITIES } from "../../../../../../../sc_shared/src/entities/card-keywords";

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
        amount: 1
      },
      weight: 80
    },
    {
      ability: {
        id: CARD_ABILITIES.SPELLSHOT,
        amount: 1
      },
      weight: 100
    },
    {
      ability: {
        id: CARD_ABILITIES.HASTE
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
        amount: 1
      },
      weight: 80
    },
    {
      ability: {
        id: CARD_ABILITIES.SPELLSHOT,
        amount: 1
      },
      weight: 100
    },
    {
      ability: {
        id: CARD_ABILITIES.HASTE
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
        amount: 1
      },
      weight: 80
    },
    {
      ability: {
        id: CARD_ABILITIES.SPELLSHOT,
        amount: 1
      },
      weight: 100
    },
    {
      ability: {
        id: CARD_ABILITIES.HASTE
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
        amount: 1
      },
      weight: 80
    },
    {
      ability: {
        id: CARD_ABILITIES.SPELLSHOT,
        amount: 1
      },
      weight: 100
    },
    {
      ability: {
        id: CARD_ABILITIES.HASTE
      },
      weight: 10
    }
  ];
}