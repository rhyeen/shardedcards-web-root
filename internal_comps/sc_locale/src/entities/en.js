export const LOCALE_EN = {
  SC_BTN: {
    PRESET: {
      BACK: 'back',
      CANCEL: 'cancel'
    },
    OTHER: {
      RESET_GAME: 'reset game',
      END_TURN: 'end turn',
      FINISH_CRAFTING: 'finish crafting',
      GAME_WON: 'You win!',
      GAME_LOST: 'You lose!',
      PLAY_CARD: 'play'
    }
  },
  ABILITY: {
    ENERGIZE: {
      NAME: 'energize',
      DESCRIPTION: (amount) => `+${amount} max and current energy.`,
    },
    HASTE: {
      NAME: 'haste',
      DESCRIPTION: 'May attack once summoned.'
    },
    SPELLSHOT: {
      NAME: 'spellshot',
      DESCRIPTION: (amount) => `Deal ${amount} to enemy unit.`
    },
    REACH: {
      NAME: 'reach',
      DESCRIPTION: (amount) => `+${amount} range`
    },
  },
  CONDITION: {
    EXHAUSTED: {
      NAME: 'exhausted',
      DESCRIPTION: 'Cannot attack this turn.'
    }
  }
};

