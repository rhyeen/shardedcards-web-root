import {
  CARD_RARITIES,
  CARD_TYPES,
  CARD_ABILITIES,
  ENERGY_SHARD } from '../../../../../../sc_shared/src/entities/card-keywords.js';

import * as Cards from '../../../card-selection.js';

export function getInitialCards() {
  let cards = {
    ravager: _getCard({
      title: 'Frontline Ravager',
      type: CARD_TYPES.MINION,
      rarity: CARD_RARITIES.COMMON,
      cost: 1,
      range: 1,
      health: 5,
      attack: 1,
      abilities: [
        {
          id: CARD_ABILITIES.HASTE
        }
      ]
    }, 5),
    incinerate: _getCard({
      title: 'Incinerate',
      rarity: CARD_RARITIES.RARE,
      type: CARD_TYPES.SPELL,
      cost: 4,
      abilities: [
        {
          id: CARD_ABILITIES.SPELLSHOT,
          amount: 4
        }
      ]
    }, 5),
    rangedweapon: _getCard({
      title: 'Ranged Weapon',
      rarity: CARD_RARITIES.EPIC,
      type: CARD_TYPES.SPELL,
      cost: 2,
      abilities: [
        {
          id: CARD_ABILITIES.REACH,
          amount: 1
        }
      ]
    }, 5),
    hero: _getCard({
      title: 'Hero',
      rarity: CARD_RARITIES.EPIC,
      type: CARD_TYPES.MINION,
      cost: 0,
      range: 3,
      health: 5,
      attack: 3
    }, 5),
    monster: _getCard({
      title: 'Monster',
      rarity: CARD_RARITIES.LEGENDARY,
      type: CARD_TYPES.MINION,
      cost: 1,
      range: 1,
      health: 5,
      attack: 3
    }, 5),
    pawn: _getCard({
      title: 'Pawn',
      rarity: CARD_RARITIES.UNDEFINED,
      type: CARD_TYPES.MINION,
      cost: 3,
      range: 1,
      health: 1,
      attack: 4
    }, 5)
  };

  cards[ENERGY_SHARD.ID] = _getCard({
    title: 'Energy Shard',
    type: CARD_TYPES.SPELL,
    rarity: CARD_RARITIES.STANDARD,
    cost: 0,
    abilities: [
      {
        id: CARD_ABILITIES.ENERGIZE,
        amount: 1
      }
    ]
  }, 1);

  return cards;
}

function _getCard(cardDetails, instancesAmount) {
  let card = _deepCopy(cardDetails);
  for (let i = 0; i < instancesAmount; i++) {
    Cards.setNewCardInstance(card, `${i}`);
  }
  return card;
};

function _deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}