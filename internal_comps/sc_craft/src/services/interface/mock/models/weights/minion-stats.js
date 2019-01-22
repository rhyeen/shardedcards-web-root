export const MinionStatsWeights = {
  common: _getCommonWeights,
  rare: _getRareWeights,
  epic: _getEpicWeights,
  legendary: _getLegendaryWeights
}

function _getCommonWeights() {
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


function _getRareWeights() {
  return [
    {
      stats: {
        range: 1,
        attack: 2,
        health: 2
      },
      weight: 100
    },
    {
      stats: {
        range: 0,
        attack: 0,
        health: 2
      },
      weight: 10
    },
    {
      stats: {
        range: 0,
        attack: 0,
        health: 4
      },
      weight: 20
    },
    {
      stats: {
        range: 2,
        attack: 1,
        health: 1
      },
      weight: 10
    },
    {
      stats: {
        range: 1,
        attack: 1,
        health: 2
      },
      weight: 30
    },
    {
      stats: {
        range: 1,
        attack: 3,
        health: 2
      },
      weight: 30
    },
    {
      stats: {
        range: 1,
        attack: 4,
        health: 1
      },
      weight: 7
    },
    {
      stats: {
        range: 1,
        attack: 2,
        health: 5
      },
      weight: 2
    },
    {
      stats: {
        range: 3,
        attack: 3,
        health: 3
      },
      weight: 1
    }
  ];
}


function _getEpicWeights() {
  return [
    {
      stats: {
        range: 1,
        attack: 3,
        health: 3
      },
      weight: 100
    },
    {
      stats: {
        range: 0,
        attack: 0,
        health: 5
      },
      weight: 10
    },
    {
      stats: {
        range: 1,
        attack: 1,
        health: 6
      },
      weight: 20
    },
    {
      stats: {
        range: 3,
        attack: 1,
        health: 1
      },
      weight: 10
    },
    {
      stats: {
        range: 2,
        attack: 4,
        health: 2
      },
      weight: 30
    },
    {
      stats: {
        range: 1,
        attack: 5,
        health: 2
      },
      weight: 30
    },
    {
      stats: {
        range: 1,
        attack: 8,
        health: 1
      },
      weight: 7
    },
    {
      stats: {
        range: 1,
        attack: 4,
        health: 6
      },
      weight: 2
    },
    {
      stats: {
        range: 3,
        attack: 5,
        health: 3
      },
      weight: 1
    }
  ];
}


function _getLegendaryWeights() {
  return [
    {
      stats: {
        range: 2,
        attack: 4,
        health: 4
      },
      weight: 100
    },
    {
      stats: {
        range: 0,
        attack: 0,
        health: 10
      },
      weight: 10
    },
    {
      stats: {
        range: 1,
        attack: 2,
        health: 20
      },
      weight: 20
    },
    {
      stats: {
        range: 3,
        attack: 4,
        health: 2
      },
      weight: 10
    },
    {
      stats: {
        range: 2,
        attack: 5,
        health: 3
      },
      weight: 30
    },
    {
      stats: {
        range: 1,
        attack: 7,
        health: 2
      },
      weight: 30
    },
    {
      stats: {
        range: 1,
        attack: 8,
        health: 4
      },
      weight: 7
    },
    {
      stats: {
        range: 1,
        attack: 5,
        health: 8
      },
      weight: 2
    },
    {
      stats: {
        range: 3,
        attack: 6,
        health: 6
      },
      weight: 1
    }
  ];
}