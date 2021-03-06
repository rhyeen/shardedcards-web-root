import { createSelector } from 'reselect';
import { getCard, getCardAbility } from '../services/card-selection.js';

const _playerDeckSelector = state => state.sc_cards.entities.player.deck;
const _playerDiscardPileCardsSelector = state => state.sc_cards.entities.player.discardPile.cards;
const _playerLostCardsSelector = state => state.sc_cards.entities.player.lostCards.cards;
const _selectedCardSelector = state => state.sc_cards.ui.selectedCard;
const _selectedAbilitySelector = state => state.sc_cards.ui.selectedAbility;
const _cardsSelector = state => state.sc_cards.entities.cards;
const _playerHandCardsSelector = state => state.sc_cards.entities.player.hand.cards;
const _playerHandRefillSizeSelector = state => state.sc_cards.entities.player.hand.refillSize;
const _playerFieldSlotsSelector = state => state.sc_cards.entities.player.field.slots;
const _opponentFieldSlotsSelector = state => state.sc_cards.entities.opponent.field.slots;
const _opponentFieldBacklogSelector = state => state.sc_cards.entities.opponent.field.backlog;

export const getCards = createSelector(
  _cardsSelector,
  (cards) => {
    return cards;
  }
);

export const getHandCards = createSelector(
  _playerHandCardsSelector,
  _cardsSelector,
  (hand, cards) => {
    let handCards = [];
    for (let handCard of hand) {
      handCards.push(_getHandCard(handCard, cards));
    }
    return handCards;
  }
);

export const getHandRefillSize = createSelector(
  _playerHandRefillSizeSelector,
  (playerHandRefillSizeSelector) => playerHandRefillSizeSelector
);

function _getHandCard(handCard, cards) {
  return {
    ...handCard,
    card: getCard(cards, handCard.id, handCard.instance)
  };
}

export const getDeckSize = createSelector(
  _playerDeckSelector,
  (deck) => {
    return deck.size;
  }
);

export const getDiscardPileCards = createSelector(
  _playerDiscardPileCardsSelector,
  (discardPileCards) => discardPileCards
);

export const getDiscardPileSize = createSelector(
  _playerDiscardPileCardsSelector,
  (discardPileCards) => {
    return discardPileCards.length;
  }
);

export const getLostPileSize = createSelector(
  _playerLostCardsSelector,
  (lostCards) => {
    return lostCards.length;
  }
);

export const getLostPileCards = createSelector(
  _playerLostCardsSelector,
  (lostCards) => lostCards
);

export const getSelectedCard = createSelector(
  _selectedCardSelector,
  _cardsSelector,
  (selectedCard, cards) => {
    return {
      ...selectedCard,
      card: getCard(cards, selectedCard.id, selectedCard.instance)
    };
  }
);

export const getSelectedAbility = createSelector(
  _selectedCardSelector,
  _selectedAbilitySelector,
  _cardsSelector,
  (selectedCard, selectedAbility, cards) => {
    return {
      ...selectedCard,
      ...selectedAbility,
      card: getCard(cards, selectedCard.id, selectedCard.instance),
      ability: getCardAbility(cards, selectedCard.id, selectedCard.instance, selectedAbility.abilityId)
    };
  }
);

export const getPlayerFieldSlots = createSelector(
  _playerFieldSlotsSelector,
  _cardsSelector,
  (fieldSlots, cards) => {
    return _getFieldSlots(fieldSlots, cards);
  }
);

export const getOpponentFieldSlots = createSelector(
  _opponentFieldSlotsSelector,
  _cardsSelector,
  (fieldSlots, cards) => {
    return _getFieldSlots(fieldSlots, cards);
  }
);

export const getOpponentFieldBacklogSizes = createSelector(
  _opponentFieldBacklogSelector,
  (backlog) => {
    return [
      backlog[0].size,
      backlog[1].size,
      backlog[2].size
    ];
  }
);

function _getFieldSlots(fieldSlots, cards) {
  return [
    _getFieldSlot(fieldSlots, 0, cards),
    _getFieldSlot(fieldSlots, 1, cards),
    _getFieldSlot(fieldSlots, 2, cards)
  ];
}

function _getFieldSlot(fieldSlots, playAreaIndex, cards) {
  return {
    ...fieldSlots[playAreaIndex],
    playAreaIndex,
    card: getCard(cards, fieldSlots[playAreaIndex].id, fieldSlots[playAreaIndex].instance)
  };
}