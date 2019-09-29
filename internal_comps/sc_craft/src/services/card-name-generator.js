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
  return arr[Math.floor((Math.random() * arr.length))];
}

const NAME_CLAUSES = {};
NAME_CLAUSES[CARD_TYPES.MINION] = {};
NAME_CLAUSES[CARD_TYPES.MINION][CARD_RARITIES.COMMON] = [
  [
    ['Goblin', 'Peasant', 'Skeleton'],
    ['Scavenger', 'Soldier', 'Cultist']
  ],
  [
    ['Herald', 'Bearer', 'Warden', 'Vagabond'],
    ['of'],
    ['Doom', 'Glory', 'Fame']
  ]
];
NAME_CLAUSES[CARD_TYPES.MINION][CARD_RARITIES.RARE] = [
  [
    ['Orcish', 'Noble', 'Zombie'],
    ['Archer', 'Knight', 'Novice']
  ]
];
NAME_CLAUSES[CARD_TYPES.MINION][CARD_RARITIES.EPIC] = [
  [
    ['Troll', 'Veteran', 'Demon'],
    ['Ranger', 'Battlemaster', 'Mage']
  ]
];
NAME_CLAUSES[CARD_TYPES.MINION][CARD_RARITIES.LEGENDARY] = [
  [
    ['Giant', 'Godsent', 'Lich'],
    ['Shadow Archer', 'Leader', 'Archmagi']
  ]
];
NAME_CLAUSES[CARD_TYPES.SPELL] = {};
NAME_CLAUSES[CARD_TYPES.SPELL][CARD_RARITIES.COMMON] = [
  [
    ['Trinket', 'Charm'],
    ['of'],
    ['Healing', 'Light', 'Spark']
  ]
];
NAME_CLAUSES[CARD_TYPES.SPELL][CARD_RARITIES.RARE] = [
  [
    ['Potion', 'Scroll'],
    ['of'],
    ['Restoration', 'Glimmer', 'Storm']
  ]
];
NAME_CLAUSES[CARD_TYPES.SPELL][CARD_RARITIES.EPIC] = [
  [
    ['Tome', 'Artifact'],
    ['of'],
    ['Revival', 'Lightburst', 'Lightning']
  ]
];
NAME_CLAUSES[CARD_TYPES.SPELL][CARD_RARITIES.LEGENDARY] = [
  [
    ['Relic', 'Blessing'],
    ['of'],
    ['Immortality', 'Suntorch', 'Skyfall']
  ]
];