export const ROOT_ROUTE_PAGE_GAME = 'game';

export const SC_GAME_STATE_PLAYING = 'playing';
export const SC_GAME_STATE_LOSE = 'lose';
export const SC_GAME_STATE_WIN = 'win';
export const SC_GAME_STATE_CRAFTING = 'crafting';

export const SC_TURN_FIRST_TURN_PLAYER = 'player';
export const SC_TURN_FIRST_TURN_OPPONENT = 'opponent';

export const SC_CRAFT_PART_TYPE_ABILITY = 'ability';
export const SC_CRAFT_PART_TYPE_STAT = 'stat';

export const ABILITY_SPELLSHOT = 'spellshot';

export const CARD_SOURCE_HAND = 'handCard'
export const CARD_SOURCE_OPPONENT_FIELD = 'opponentFieldCard'
export const CARD_SOURCE_PLAYER_FIELD = 'playerFieldCard'
export const CARD_SOURCE_CASTING = 'castingCard'
export const CARD_SOURCE_CASTING = 'castingCard'

export const SELECTED_ABILITY_TARGET_OPPONENT_UNIT = 'opponentUnit'
export const SELECTED_ABILITY_TARGET_PLAYER_UNIT = 'playerUnit'


state = {
  root: {
    route: {
      activePage: ROOT_ROUTE_PAGE_GAME
    },
    network: {
      offline: false
    }
  },
  sc_tool_snackbar: {
    ui: {
      show: false
    }
  },
  sc_turn: {
    entities: {
      firstTurn: SC_TURN_FIRST_TURN_PLAYER,
      player: {
        pendingTurn: [],
        turnHistory: []
      },
      opponent: {
        turnHistory: []
      }
    }
  },
  sc_game: {
    ui: {
      menu: {
        show: false
      },
      game: {
        state: GAME_STATE_PLAYING
      }
    }
  },
  sc_status: {
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
  },
  sr_craft: {
    ui: {
      selectedAvailableBaseCard: {
        cardIndex: null,
        forgeIndex: null
      },
      selectedAvailablePart: {
        partIndex: null,
        forgeIndex: null
      }
    },
    entities: {
      availableParts: [
        {
          type: PART_TYPE_ABILITY,
          id: ABILITY_SPELLSHOT,
          amount: 1
        },
        {
          type: PART_TYPE_ABILITY,
          id: ABILITY_HASTE
        },
        {
          type: PART_TYPE_ABILITY,
          id: ABILITY_REACH,
          amount: 1
        }
      ],
      forge: [
        {
          card: {}
        },
        {
          card: {}
        }
      ],
      availableBaseCards: [
        {
          type: CARD_TYPE_UNIT,
          rarity: CARD_RARITY_COMMON,
          cost: 1,
          range: 1,
          health: 5,
          attack: 1,
          abilities: [],
          slots: 0
        }
      ]
    }
  },
  sr_cards: {
    ui: {
      selectedCard: {
        source: CARD_SOURCE_HAND,
        id: null,
        instance: null,
        handIndex: null,
        playAreaIndex: null
      },
      selectedAbility: {
        target: SELECTED_ABILITY_TARGET_OPPONENT_UNIT,
        id: null,
        instance: null,
        abilityId: null,
        handIndex: null,
        playAreaIndex: null
      },
      playCard: {
        source: CARD_SOURCE_HAND,
        instance: null,
        handIndex: null,
        playAreaIndex: null
      }
    },
    entities: {
      player: {
        cards: {},
        hand: {
          cards: [],
          size: 5
        },
        deck: {
          size: 0
        },
        discardPile: {
          size: 0
        },
        lostCards: {
          size: 0
        },
        field: {
          slots: [
            {
              id: null,
              instance: null
            },
            {
              id: null,
              instance: null
            },
            {
              id: null,
              instance: null
            }
          ]
        }
      },
      opponent: {
        field: {
          backlog: [
            {
              size: 0
            },
            {
              size: 0
            },
            {
              size: 0
            }
          ],
          slots: [
            {
              id: null,
              instance: null
            },
            {
              id: null,
              instance: null
            },
            {
              id: null,
              instance: null
            }
          ]
        }
      }
    }
  }
}