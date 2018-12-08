import { CARD_RARITIES } from '../../../../../../sc_shared/src/entities/card-keywords.js';  

export function getInitialOpponentCards() {
  return {
    CD_GOBLIN_PEON: {
      title: 'Goblin Peon',
      rarity: CARD_RARITIES.COMMON,
      level: 0,
      range: 1,
      health: 5,
      attack: 1
    },
    CD_IMP_UNDERLING: {
      title: 'Imp Underling',
      rarity: CARD_RARITIES.COMMON,
      level: 1,
      range: 2,
      health: 2,
      attack: 2
    },
    CD_HOBGOBLIN_RAIDERS: {
      title: 'Hob Goblin Raiders',
      rarity: CARD_RARITIES.COMMON,
      level: 2,
      range: 1,
      health: 5,
      attack: 3
    },
    CD_BANDIT_RECRUIT: {
      title: 'Bandit Recruit',
      rarity: CARD_RARITIES.COMMON,
      level: 1,
      range: 1,
      health: 7,
      attack: 1
    },
    CD_THORN_SPITTER_VINE: {
      title: 'Thorn Spitter Vine',
      rarity: CARD_RARITIES.COMMON,
      level: 2,
      range: 3,
      health: 1,
      attack: 4
    },
    CD_ROCK_GOLEM: {
      title: 'Rock Golem',
      rarity: CARD_RARITIES.RARE,
      level: 3,
      range: 1,
      health: 15,
      attack: 2
    },
    CD_GOBLIN_HERDER: {
      title: 'Goblin Herder',
      rarity: CARD_RARITIES.RARE,
      level: 3,
      range: 2,
      health: 7,
      attack: 3
    },
    CD_ASSASSIN_SPIRIT: {
      title: 'Assassin',
      rarity: CARD_RARITIES.RARE,
      level: 4,
      range: 3,
      health: 4,
      attack: 10
    },
    CD_DEMON_SPRITE: {
      title: 'Demon Sprite',
      rarity: CARD_RARITIES.RARE,
      level: 5,
      range: 3,
      health: 10,
      attack: 3
    },
    CD_DIRE_DRAGON_WYRMLING: {
      title: 'Dire Dragon Wyrmling',
      rarity: CARD_RARITIES.EPIC,
      level: 6,
      range: 3,
      health: 15,
      attack: 5
    },
    CD_TROLL_HUNTER: {
      title: 'Troll Hunter',
      rarity: CARD_RARITIES.EPIC,
      level: 6,
      range: 1,
      health: 20,
      attack: 5
    },
    CD_TROLL_HUNTER: {
      title: 'Troll Hunter',
      rarity: CARD_RARITIES.EPIC,
      level: 7,
      range: 1,
      health: 20,
      attack: 5
    },
    CD_SHADOW_DRAKE: {
      title: 'Shadow Drake',
      rarity: CARD_RARITIES.LEGENDARY,
      level: 8,
      range: 3,
      health: 35,
      attack: 10
    },
    CD_STORM_MASTER: {
      title: 'Storm Master',
      rarity: CARD_RARITIES.LEGENDARY,
      level: 8,
      range: 2,
      health: 25,
      attack: 13
    }
  };
}