import * as ActionType from '../actions/sc_status.js';
import { setValidEnergy, getModifiedEnergy } from '../../entities/energy-status.js';

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

function _deepCopyState(state) {
  return {
    entities: {
      player: {
        energy: {
          ...state.entities.player.energy
        },
        health: {
          ...state.entities.player.health
        }
      }
    }
  };
}

function _setPlayerPendingEnergy(state, energy, copyState = false) {
  let newState = _getState(state, copyState);
  newState.entities.player.energy.pending = energy;
  return newState;
}

function _setPlayerCurrentHealth(state, health, copyState = false) {
  let newState = _getState(state, copyState);
  newState.entities.player.health.pending = health;
  newState.entities.player.health.current = health;
  return newState;
}

function _setPlayerCurrentEnergy(state, energy, copyState = false) {
  let newState = _getState(state, copyState);
  newState.entities.player.energy.pending = energy;
  newState.entities.player.energy.current = energy;
  return newState;
}

function _setPlayerMaxHealth(state, health, copyState = false) {
  let newState = _getState(state, copyState);
  newState.entities.player.health.max = health;
  return newState;
}

function _setPlayerMaxEnergy(state, energy, copyState = false) {
  let newState = _getState(state, copyState);
  newState.entities.player.energy.max = energy;
  return newState;
}

function _getState(state, copyState) {
  if (copyState) {
    return _deepCopyState(state);
  }
  return state;
}

export const sc_status = (state = INITIAL_STATE, action) => {
  let newState, newEnergies;
  switch (action.type) {
    case ActionType.SET_PLAYER_STATUS:
      newState = _deepCopyState(state);
      _setPlayerCurrentHealth(newState, action.status.health.current);
      _setPlayerMaxHealth(newState, action.status.health.max);
      _setPlayerCurrentEnergy(newState, action.status.energy.current);
      _setPlayerMaxEnergy(newState, action.status.energy.max);
      return newState;
    case ActionType.SET_PLAYER_HEALTH:
      return _setPlayerCurrentHealth(state, action.health, true);
    case ActionType.RESET_PLAYER_ENERGY:
    return _setPlayerMaxEnergy(state, state.entities.player.energy.max, true);   
    case ActionType.ALLOCATE_PLAYER_ENERGY:
      return _setPlayerPendingEnergy(state, setValidEnergy(state.energy.current - action.energyCost), true);
    case ActionType.SPEND_ALLOCATED_PLAYER_ENERGY.SUCCESS:
      return _setPlayerCurrentEnergy(state, state.entities.player.energy.pending, true);
    case ActionType.CANCEL_ALLOCATED_PLAYER_ENERGY:
      return _setPlayerPendingEnergy(state, state.entities.player.energy.current, true);
    case ActionType.MODIFY_PLAYER_ENERGY.SUCCESS:
      newState = _deepCopyState(state);
      newEnergies = getModifiedEnergy(newState.entities.player.energy, action.maxEnergyModifier, action.currentEnergyModifier);
      _setPlayerCurrentEnergy(newState, newEnergies.current);
      _setPlayerMaxEnergy(newState, newEnergies.max);
      return newState;
    default:
      return state;
  }
};

