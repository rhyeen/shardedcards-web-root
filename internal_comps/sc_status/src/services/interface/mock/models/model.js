import { Log } from "../../../../../../sc_shared/src/services/logger";

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

export const DEBUG = {
  playerStatus: () => {
    Log.debug('playerStatus:');
    Log.debug({
      maxEnergy: Model.player.energy.max,
      currentEnergy: Model.player.energy.current,
      maxHealth: Model.player.health.max,
      currentHealth: Model.player.health.current
    });
  }
};