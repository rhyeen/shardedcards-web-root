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
        let newEnergies = getModifiedEnergy(Model.player.energy, statusUpdates.player.energy.maxModifier, null);
        _setPlayerMaxEnergy(newEnergies.max);
      }
      if (statusUpdates.player.energy.currentModifier) {
        let newEnergies = getModifiedEnergy(Model.player.energy, null, statusUpdates.player.energy.currentModifier);
        _setPlayerCurrentEnergy(newEnergies.current);
      }
    }
  }
};

export const canPayCardCost = (card) => {
  return card.cost <= Model.player.energy.current;
}

export const refreshEnergy = () => {
  Model.player.energy.current = Model.player.energy.max;
}

function _setPlayerMaxEnergy(max) {
  Model.player.energy.max = max;
}

function _setPlayerCurrentEnergy(current) {
  Model.player.energy.current = current;
}