
export const MinionStatsWeights = {
  common: _getCommonMinionStatsWeights()
}

function _getCommonMinionStatsWeights() {
  return [
    {
      stats: {
        range: 1,
        attack: 1,
        health: 1
      },
      weight: 100
    },
    {
      stats: {
        range: 0,
        attack: 0,
        health: 1
      },
      weight: 10
    },
    {
      stats: {
        range: 0,
        attack: 0,
        health: 3
      },
      weight: 20
    },
    {
      stats: {
        range: 2,
        attack: 0,
        health: 1
      },
      weight: 10
    },
    {
      stats: {
        range: 1,
        attack: 0,
        health: 1
      },
      weight: 30
    },
    {
      stats: {
        range: 0,
        attack: 1,
        health: 1
      },
      weight: 30
    },
    {
      stats: {
        range: 1,
        attack: 2,
        health: 1
      },
      weight: 7
    },
    {
      stats: {
        range: 1,
        attack: 3,
        health: 1
      },
      weight: 2
    },
    {
      stats: {
        range: 2,
        attack: 2,
        health: 2
      },
      weight: 1
    }
  ];
}