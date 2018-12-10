export const Model = _getInitialModel();

function _getInitialModel() {
  return {
    player: {
      energy: {
        max: 10,
        current: 10
      },
      health: {
        max: 20,
        current: 20
      }
    }
  };
}

export function initializeModel() {
  let model = _getInitialModel();
  Model.player = model.player;
}