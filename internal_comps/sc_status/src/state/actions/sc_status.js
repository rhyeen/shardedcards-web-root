const COMPONENT_TAG = 'SR_STATUS';

/**
 * Base structure derived from: 
 * https://github.com/redux-saga/redux-saga/blob/master/examples/real-world/_actions/index.js
 */
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function _createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${COMPONENT_TAG}_${base}_${type}`;
		return acc;
	}, {})
}

function _createRequestRaw(base) {
  return `${COMPONENT_TAG}_${base}`;
}

function _action(type, payload = {}) {
  return {type, ...payload};
}

export const SET_PLAYER_STATUS =  _createRequestRaw('SET_PLAYER_STATUS');
export const setPlayerStatus = (maxHealth, currentHealth, maxEnergy, currentEnergy) => {
  return _action(SET_PLAYER_STATUS, {
    status: {
      health: {
        current: currentHealth,
        max: maxHealth
      },
      energy: {
        current: currentEnergy,
        max: maxEnergy
      }
    }
  });
};

export const SET_PLAYER_HEALTH =  _createRequestRaw('SET_PLAYER_HEALTH');
export const setPlayerHealth = (health) => _action(SET_PLAYER_HEALTH, {health});

export const RESET_PLAYER_ENERGY =  _createRequestRaw('RESET_PLAYER_ENERGY');
export const resetPlayerEnergy = () => _action(RESET_PLAYER_ENERGY, {});

export const ALLOCATE_PLAYER_ENERGY =  _createRequestRaw('ALLOCATE_PLAYER_ENERGY');
export const allocatePlayerEnergy = (energyCost) => _action(ALLOCATE_PLAYER_ENERGY, {energyCost});

export const SPEND_ALLOCATED_PLAYER_ENERGY = _createRequestTypes('SPEND_ALLOCATED_PLAYER_ENERGY');
export const spendAllocatedPlayerEnergy = {
  request: () => _action(SPEND_ALLOCATED_PLAYER_ENERGY.REQUEST, {}),
  success: () => _action(SPEND_ALLOCATED_PLAYER_ENERGY.SUCCESS, {})
};

export const CANCEL_ALLOCATED_PLAYER_ENERGY =  _createRequestRaw('CANCEL_ALLOCATED_PLAYER_ENERGY');
export const cancelAllocatedPlayerEnergy = () => _action(CANCEL_ALLOCATED_PLAYER_ENERGY, {});

export const MODIFY_PLAYER_ENERGY = _createRequestTypes('MODIFY_PLAYER_ENERGY');
export const modifyPlayerEnergy = {
  request: (maxEnergyModifier, currentEnergyModifier) => _action(MODIFY_PLAYER_ENERGY.REQUEST, {maxEnergyModifier, currentEnergyModifier}),
  success: (maxEnergyModifier, currentEnergyModifier) => _action(MODIFY_PLAYER_ENERGY.SUCCESS, {maxEnergyModifier, currentEnergyModifier})
};
