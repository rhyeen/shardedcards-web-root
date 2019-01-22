import { CARD_STATS } from "../../../../../../../sc_shared/src/entities/card-keywords";

export const StatPartWeights = {
  common: _getCommonWeights,
  rare: _getRareWeights,
  epic: _getEpicWeights,
  legendary: _getLegendaryWeights
}

function _getCommonWeights() {
  return [
    {
      stat: {
        id: CARD_STATS.HEALTH,
        amount: 1
      },
      weight: 100
    },
    {
      stat: {
        id: CARD_STATS.ATTACK,
        amount: 1
      },
      weight: 80
    },
    {
      stat: {
        id: CARD_STATS.RANGE,
        amount: 1
      },
      weight: 10
    }
  ];
}

function _getRareWeights() {
  return [
    {
      stat: {
        id: CARD_STATS.HEALTH,
        amount: 1
      },
      weight: 100
    },
    {
      stat: {
        id: CARD_STATS.ATTACK,
        amount: 1
      },
      weight: 80
    },
    {
      stat: {
        id: CARD_STATS.RANGE,
        amount: 1
      },
      weight: 10
    }
  ];
}

function _getEpicWeights() {
  return [
    {
      stat: {
        id: CARD_STATS.HEALTH,
        amount: 1
      },
      weight: 100
    },
    {
      stat: {
        id: CARD_STATS.ATTACK,
        amount: 1
      },
      weight: 80
    },
    {
      stat: {
        id: CARD_STATS.RANGE,
        amount: 1
      },
      weight: 10
    }
  ];
}

function _getLegendaryWeights() {
  return [
    {
      stat: {
        id: CARD_STATS.HEALTH,
        amount: 1
      },
      weight: 100
    },
    {
      stat: {
        id: CARD_STATS.ATTACK,
        amount: 1
      },
      weight: 80
    },
    {
      stat: {
        id: CARD_STATS.RANGE,
        amount: 1
      },
      weight: 10
    }
  ];
}