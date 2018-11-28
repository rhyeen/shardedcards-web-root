import * as ActionType from './actions.js';
import { setValidEnergy, getModifiedEnergy } from '../entities/energy-status.js';

const INITIAL_STATE = {
  entities: {
    player: {
      energy: {
        max: 0,
        current: 0,
        pending: 0
      },
      health: {
        max: 0,
        current: 0,
        pending: 0
      }
    }
  }
};

function _setPlayerPendingEnergy(state, energy) {
  return {
    ...state,
    entities: {
      ...state.entities,
      player: {
        ...state.entities.player,
        energy: {
          ...state.entities.player.energy,
          pending: energy
        }
      }
    }
  };
}

function _setPlayerCurrentHealth(state, health) {
  return {
    ...state,
    entities: {
      ...state.entities,
      player: {
        ...state.entities.player,
        health: {
          ...state.entities.player.health,
          pending: health,
          current: health
        }
      }
    }
  };
}

function _setPlayerCurrentEnergy(state, energy) {
  return {
    ...state,
    entities: {
      ...state.entities,
      player: {
        ...state.entities.player,
        energy: {
          ...state.entities.player.energy,
          pending: energy,
          current: energy
        }
      }
    }
  };
}

function _setPlayerMaxHealth(state, health) {
  return {
    ...state,
    entities: {
      ...state.entities,
      player: {
        ...state.entities.player,
        health: {
          ...state.entities.player.health,
          max: health
        }
      }
    }
  };
}

function _setPlayerMaxEnergy(state, energy) {
  return {
    ...state,
    entities: {
      ...state.entities,
      player: {
        ...state.entities.player,
        energy: {
          ...state.entities.player.energy,
          max: energy
        }
      }
    }
  };
}

export const sc_status = (state = INITIAL_STATE, action) => {
  let newState, newEnergies;
  switch (action.type) {
    case ActionType.SET_PLAYER_STATUS:
      newState = _setPlayerCurrentHealth(state, action.status.health.current);
      newState = _setPlayerMaxHealth(newState, action.status.health.max);
      newState = _setPlayerCurrentEnergy(newState, action.status.energy.current);
      return _setPlayerMaxEnergy(newState, action.status.energy.max);
    case ActionType.SET_PLAYER_HEALTH:
      return _setPlayerCurrentHealth(state, action.health);
    case ActionType.RESET_PLAYER_ENERGY:
    return _setPlayerMaxEnergy(state, state.entities.player.energy.max);   
    case ActionType.ALLOCATE_PLAYER_ENERGY:
      return _setPlayerPendingEnergy(state, setValidEnergy(state.energy.current - action.energyCost));
    case ActionType.SPEND_ALLOCATED_PLAYER_ENERGY.SUCCESS:
      return _setPlayerCurrentEnergy(state, state.entities.player.energy.pending);
    case ActionType.CANCEL_ALLOCATED_PLAYER_ENERGY:
      return _setPlayerPendingEnergy(state, state.entities.player.energy.current);
    case ActionType.MODIFY_PLAYER_ENERGY.SUCCESS:
      newEnergies = getModifiedEnergy(newState.entities.player.energy, action.maxEnergyModifier, action.currentEnergyModifier);
      newState = _setPlayerCurrentEnergy(state, newEnergies.current);
      return _setPlayerMaxEnergy(newState, newEnergies.max);
    default:
      return state;
  }
};

