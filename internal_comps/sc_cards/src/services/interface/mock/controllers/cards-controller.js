import { Model, initializeModel } from '../models/model.js';
import { getInitialOpponentCards } from '../models/initial-opponent-cards.js';
import { Log } from '../../../../../../sc_shared/src/services/logger.js';

import * as Cards from '../../../card-selection.js';
import * as CardActions from '../../../card-actions.js';

import {
  CARD_RARITIES,
  ENERGY_SHARD } from '../../../../../../sc_shared/src/entities/card-keywords.js';

const OPPONENT_BACKLOG_PARTITIONS = {
  COMMON: 5,
  RARE: 5,
  EPIC: 5,
  LEGENDARY: 1,
  CHANCE_OF_NEXT_LEVEL_CARD: 0.3
};

export const refreshOpponentField = () => {
  let fieldCards = _getOpponentFieldCards();
  fieldCards = CardActions.refreshCards(fieldCards);
  _addToCardsUpdatedOnOpponentTurn(fieldCards);
  Cards.setCards(Model.cards, fieldCards);
};

function _addToCardsUpdatedOnOpponentTurn(cards) {
  for (let card of cards) {
    index = _getCardUpdatedFromOpponentTurnIndex(card.id, card.instance);
    if (index > -1) {
      Model.cardsUpdatedFromOpponentTurn[index] = card;
    } else {
      Model.cardsUpdatedFromOpponentTurn.push(card);
    }
  }
}

function _getCardUpdatedFromOpponentTurnIndex(cardId, cardInstance) {
  for (let i = 0; i < Model.cardsUpdatedFromOpponentTurn.length; i++) {
    let card = Model.cardsUpdatedFromOpponentTurn[i];
    if (cardId === card.id && cardInstance === card.instance) {
      return i;
    }
  }
  return -1;
}

function _getOpponentFieldCards() {
  let cards = [
    Model.opponent.field.slots[0],
    Model.opponent.field.slots[1],
    Model.opponent.field.slots[2]
  ];
  return Cards.getCards(Model.cards, cards);
}

export const refreshPlayerField = () => {
  let fieldCards = _getPlayerFieldCards();
  fieldCards = CardActions.refreshCards(fieldCards);
  _addToCardsUpdatedOnOpponentTurn(fieldCards);
  Cards.setCards(Model.cards, fieldCards);
}

function _getPlayerFieldCards() {
  let cards = [
    Model.player.field.slots[0],
    Model.player.field.slots[1],
    Model.player.field.slots[2]
  ];
  return Cards.getCards(Model.cards, cards);
}

export const initializeCards = () => {
  initializeModel();
  _setOpponentFieldBacklogs();
  shuffleDrawDeck(true);
  // @NOTE: no idea why this would be necessary.
  // refreshOpponentField();
};

function _setOpponentFieldBacklogs() {
  _setOpponentFieldBacklog(0);
  _setOpponentFieldBacklog(1);
  _setOpponentFieldBacklog(2);
}

function _setOpponentFieldBacklog(playFieldIndex) {
  let backlog = [];
  backlog.push(..._getOpponentCardsByRarity(CARD_RARITIES.COMMON, OPPONENT_BACKLOG_PARTITIONS.COMMON, playFieldIndex));
  backlog.push(..._getOpponentCardsByRarity(CARD_RARITIES.RARE, OPPONENT_BACKLOG_PARTITIONS.RARE, playFieldIndex));
  backlog.push(..._getOpponentCardsByRarity(CARD_RARITIES.EPIC, OPPONENT_BACKLOG_PARTITIONS.EPIC, playFieldIndex));
  backlog.push(..._getOpponentCardsByRarity(CARD_RARITIES.LEGENDARY, OPPONENT_BACKLOG_PARTITIONS.LEGENDARY, playFieldIndex));
  Model.opponent.field.backlog[playFieldIndex] = backlog;
  _addOpponentFieldInstancesToOpponentCards(playFieldIndex);
}

/**
 * playFieldIndex is used to ensure all fields (0, 1, 2) have different instance numbers for the same cards.
 */
function _getOpponentCardsByRarity(rarity, size, playFieldIndex) {
  let cardsByLevel = _getOpponentCardsByLevel(rarity);
  let cardsPerLevel = Math.floor(size / cardsByLevel.levels.length);
  let cardsInLastLevel = size - (cardsPerLevel * (cardsByLevel.levels.length - 1));
  let cards = [];  
  for (let level of cardsByLevel.levels) {
    if (_lastLevelInRarity(level, cardsByLevel)) {
      for (let i = 0; i < cardsInLastLevel; i++) {
        cards.push(_getRandomArrayElement(cardsByLevel.cards[level]));
      }
    } else {
      for (let i = 0; i < cardsPerLevel; i++) {
        if (_increaseCardLevel()) {
          cards.push(_getRandomArrayElement(cardsByLevel.cards[parseInt(level) + 1]));
        } else {
          cards.push(_getRandomArrayElement(cardsByLevel.cards[level]));
        }
      }
    }
  }
  return _getOffsetInstances(cards, size * playFieldIndex)
}

function _lastLevelInRarity(level, cardsByLevel) {
  return level === cardsByLevel.levels[cardsByLevel.levels.length - 1];
}

function _increaseCardLevel() {
  return Math.random() <= OPPONENT_BACKLOG_PARTITIONS.CHANCE_OF_NEXT_LEVEL_CARD;
}

function _getRandomArrayElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function _getOffsetInstances(cards, instanceOffset) {
  let cardIds = {};
  let instances = [];
  for (let card of cards) {
    if (!(card.id in cardIds)) {
      cardIds[card.id] = instanceOffset;
    }
    instances.push({
      id: card.id,
      instance: cardIds[card.id]
    });
    cardIds[card.id] += 1;
  }
  return instances;
}

function _getOpponentCardsByLevel(rarity) {
  let cardsByLevel = {
    levels: [],
    cards: {}
  };
  let opponentCards = getInitialOpponentCards();
  for (let cardId in opponentCards) {
    let card = opponentCards[cardId];
    if (card.rarity !== rarity) {
      continue;
    }
    card.id = cardId;
    let level = card.level;
    if (!(level in cardsByLevel.cards)) {
      cardsByLevel.cards[level] = [];
      cardsByLevel.levels.push(level);
    }
    cardsByLevel.cards[level].push(card);
  }
  cardsByLevel.levels.sort();
  return cardsByLevel;
}

function _addOpponentFieldInstancesToOpponentCards(playFieldIndex) {
  for (let fieldCard of Model.opponent.field.backlog[playFieldIndex]) {
    Cards.setNewCardInstance(Model.cards[fieldCard.id], fieldCard.instance);
  }
}

export const shuffleDrawDeck = (initial = false) => {
  _shuffleArray(Model.player.deck.cards);
  if (initial) {
    _placeEnergyShardOnTop(Model.player.deck.cards);
  }
};

function _shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function _placeEnergyShardOnTop(deck) {
  for (let i = 0; i < deck.length; i++) {
    if (deck[i].id === ENERGY_SHARD.ID) {
      if (i === 0) {
        return;
      }
      [deck[i], deck[0]] = [deck[0], deck[i]];
      return;
    }
  }
  Log.error(`cannot find the energy shard: ${ENERGY_SHARD.ID}`);
}

export const shuffleDiscardIntoDrawDeck = () => {
  Model.player.deck.push(...Model.player.discardPile.cards);
  Model.player.discardPile.cards = [];
  shuffleDrawDeck();
};

export const redrawHand = () => {
  CardActions.resetCards(Model.cards, Model.player.hand.cards);
  Model.player.discardPile.cards.push(...Model.player.hand.cards);
  Model.player.hand.cards = [];
  drawCards(Model.player.hand.refillSize);
};

export const drawCards = (amount) => {
  let remainingDeckCards = Model.player.deck.cards.length;
  if (remainingDeckCards < amount) {
    _drawCards(remainingDeckCards);
    shuffleDiscardIntoDrawDeck();
    _drawCards(amount - remainingDeckCards);
  } else {
    _drawCards(amount);
  }
};

function _drawCards(amount) {
  let newCards = Model.player.deck.cards.splice(0, amount);
  Model.player.hand.cards.push(...newCards);
}
