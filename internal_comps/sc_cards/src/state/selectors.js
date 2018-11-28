import { createSelector } from 'reselect';

const _playerDeckSelector = state => state.sc_cards.entities.player.deck;
const _playerDiscardPileSelector = state => state.sc_cards.entities.player.discardPile;
const _playerLostCardsSelector = state => state.sc_cards.entities.player.lostCards;

export const getDeckSize = createSelector(
  _playerDeckSelector,
  (deck) => {
    return deck.size;
  }
);

export const getDiscardPileSize = createSelector(
  _playerDiscardPileSelector,
  (discardPile) => {
    return discardPile.cards.length;
  }
);

export const getLostPileSize = createSelector(
  _playerLostCardsSelector,
  (lostCards) => {
    return lostCards.cards.length;
  }
);
