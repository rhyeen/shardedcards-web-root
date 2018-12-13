import { initializeModel, Model } from '../models/model.js';
import { getModifiedEnergy } from '../../../../entities/energy-status.js';

export const initializeStatus = () => {
  initializeModel();
};

export const updateStatus = (statusUpdates) => {
  if (!statusUpdates) {
    return;
  }
  if (statusUpdates.player) {
    if (statusUpdates.player.energy) {
      if (statusUpdates.player.energy.maxModifier) {
        newEnergies = getModifiedEnergy(Model.player.energy, statusUpdates.player.energy.maxModifier, null);
        newState = _setPlayerMaxEnergy(newEnergies.max);
      }
      if (statusUpdates.player.energy.currentModifier) {
        newEnergies = getModifiedEnergy(Model.player.energy, null, statusUpdates.player.energy.currentModifier);
        newState = _setPlayerCurrentEnergy(newEnergies.current);
      }
    }
  }
};

function _setPlayerMaxEnergy(max) {
  Model.player.energy.max = max;
}

function _setPlayerCurrentEnergy(current) {
  Model.player.energy.current = current;
}