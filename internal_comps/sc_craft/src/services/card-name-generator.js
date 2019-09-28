import { CARD_TYPES, CARD_RARITIES } from "../../../sc_shared/src/entities/card-keywords";
import { Log } from "../../../sc_shared/src/services/logger";

export function getRandomCardName(card) {
  if (!(card.type in NAME_CLAUSES)) {
    Log.error(`unexpected card type: ${card.type}`);
    return '?';
  }
  if (!(card.rarity in NAME_CLAUSES[card.type])) {
    Log.error(`unexpected card rarity: ${card.rarity}`);
    return '?';
  }
  const cardNameClauses = NAME_CLAUSES[card.type][card.rarity];
  const cardNameClause = _getRandomCardNameClause(cardNameClauses);
  let cardNameParts = [];
  for (let i = 0; i < cardNameClause.length; i++) {
    cardNameParts.push(_getRandomCardNamePart(cardNameClause[i]));
  }
  return cardNameParts.join(' ');
}

function _getRandomCardNameClause(cardNameClauses) {
  return _getRandomArrayElement(cardNameClauses);
}

function _getRandomCardNamePart(cardNamePart) {
  return _getRandomArrayElement(cardNamePart);
}

function _getRandomArrayElement(arr) {
  return arr[Math.floor((Math.random() * arr.length) + 1)];
}

const NAME_CLAUSES = {};
NAME_CLAUSES[CARD_TYPES.MINION] = {};
NAME_CLAUSES[CARD_TYPES.MINION][CARD_RARITIES.COMMON] = [
  [
    ['goblin', 'peasant', 'skeleton'],
    ['scavenger', 'soldier', 'cultist']
  ],
  [
    ['herald', 'bearer', 'warden', 'vagabond'],
    ['of'],
    ['doom', 'glory', 'fame']
  ]
];
NAME_CLAUSES[CARD_TYPES.MINION][CARD_RARITIES.RARE] = [
  [
    ['orcish', 'noble', 'zombie'],
    ['archer', 'knight', 'novice']
  ]
];
NAME_CLAUSES[CARD_TYPES.MINION][CARD_RARITIES.EPIC] = [
  [
    ['troll', 'veteran', 'demon'],
    ['ranger', 'battlemaster', 'mage']
  ]
];
NAME_CLAUSES[CARD_TYPES.MINION][CARD_RARITIES.LEGENDARY] = [
  [
    ['giant', 'godsent', 'lich'],
    ['shadow archer', 'leader', 'archmagi']
  ]
];
NAME_CLAUSES[CARD_TYPES.SPELL] = {};
NAME_CLAUSES[CARD_TYPES.SPELL][CARD_RARITIES.COMMON] = [
  [
    ['trinket', 'charm'],
    ['of'],
    ['healing', 'light', 'spark']
  ]
];
NAME_CLAUSES[CARD_TYPES.SPELL][CARD_RARITIES.RARE] = [
  [
    ['potion', 'scroll'],
    ['of'],
    ['restoration', 'glimmer', 'storm']
  ]
];
NAME_CLAUSES[CARD_TYPES.SPELL][CARD_RARITIES.EPIC] = [
  [
    ['tome', 'artifact'],
    ['of'],
    ['revival', 'lightburst', 'lightning']
  ]
];
NAME_CLAUSES[CARD_TYPES.SPELL][CARD_RARITIES.LEGENDARY] = [
  [
    ['relic', 'blessing'],
    ['of'],
    ['immortality', 'suntorch', 'skyfall']
  ]
];