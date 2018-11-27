import { createSelector } from 'reselect';

const _playerEnergySelector = state => state.sc_status.entities.player.energy;
const _playerHealthSelector = state => state.sc_status.entities.player.health;

export const getCurrentEnergy = createSelector(
  _playerEnergySelector,
  (energy) => {
    return energy.current;
  }
);

export const getMaxEnergy = createSelector(
  _playerEnergySelector,
  (energy) => {
    return energy.max;
  }
);

export const getCurrentHealth = createSelector(
  _playerHealthSelector,
  (health) => {
    return health.current;
  }
);

export const getMaxHealth = createSelector(
  _playerHealthSelector,
  (health) => {
    return health.max;
  }
);