import { createSelector } from 'reselect';

import { GAME_STATES } from '../entities/game-states.js';


const _gameMenuSelector = state => state.sc_game.ui.menu;
const _gameStateSelector = state => state.sc_game.ui.game;
const _pendingTurnSelector = state => state.sc_game.entities.pendingTurn;

export const getPendingTurn = createSelector(
  _pendingTurnSelector,
  (pendingTurn) => {
    return pendingTurn;
  }
);

export const isGameMenuOpen = createSelector(
  _gameMenuSelector,
  (menu) => {
    return menu.show;
  }
);

export const isPlayingCards = createSelector(
  _gameStateSelector,
  (game) => {
    return game.state === GAME_STATES.PLAYING;
  }
);

export const isCrafting = createSelector(
  _gameStateSelector,
  (game) => {
    return game.state === GAME_STATES.CRAFTING;
  }
);

export const hasWon = createSelector(
  _gameStateSelector,
  (game) => {
    return game.state === GAME_STATES.WIN;
  }
);

export const hasLost = createSelector(
  _gameStateSelector,
  (game) => {
    return game.state === GAME_STATES.LOSE;
  }
);