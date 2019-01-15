import { html } from '@polymer/lit-element';

export const LOCALE_EN = {
  SC_ROOT: {
    PAGE_NOT_FOUND: {
      P1: 'Nothing behind these curtains.',
      P2: html`Lets <a href="/">get back to the fun</a>.`
    },
    TITLE: {
      APP_NAME: 'Sharded Cards',
      PLAY: 'PLAY',
      NOT_FOUND: '404 - NOT FOUND'
    }
  },
  SC_BTN: {
    PRESET: {
      BACK: 'back',
      CANCEL: 'cancel',
      DONE: 'done'
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
      DESCRIPTION: () => 'May attack once summoned.'
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
      DESCRIPTION: () => 'Cannot attack this turn.'
    }
  }
};

