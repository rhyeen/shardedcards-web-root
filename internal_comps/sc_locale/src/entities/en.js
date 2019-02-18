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
  SC_CRAFT: {
    CRAFTING_PARTS: {
      FORGE_NOT_EMPTY: (amount) => html`Add <span class="dynamic-value">${amount}</span> to a card in the forge.`,
      FORGE_EMPTY: 'Unlock by adding a card to the forge.'
    },
    CRAFTING_CARD_SLOTS: {
      ABILITY_COUNT: (amount) => amount === 1 ? html`<span class="count">1</span> ability` : html`<span class="count">${amount}</span> abilities`,
      SLOT_COUNT: (amount) => amount === 1 ? html`<span class="count">1</span> slot left` : html`<span class="count">${amount}</span> slots left`
    },
    CRAFTING_CARD_SLOT_VALUE: {
      TITLE: 'empty slot',
      DESCRIPTION: 'fill with an ability'
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
      PLAY_CARD: 'play',
      FORGE_CARD: 'forge',
      FINISH_FORGE: 'finish card'
    }
  },
  ABILITY: {
    ENERGIZE: {
      NAME: 'energize',
      DESCRIPTION: (amount) => `+${amount} max and current energy.`
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
  CARD_STAT: {
    HEALTH: {
      NAME: 'health',
      DESCRIPTION: (amount) => `+${amount} to max health.`
    },
    ATTACK: {
      NAME: 'attack',
      DESCRIPTION: (amount) => `+${amount} to attack.`
    },
    COST: {
      NAME: 'cost',
      DESCRIPTION: (amount) => `+${amount} to energy cost.`
    },
    SHIELD: {
      NAME: 'shield',
      DESCRIPTION: (amount) => `+${amount} to current shield.`
    },
    RANGE: {
      NAME: 'range',
      DESCRIPTION: (amount) => `+${amount} to attack range.`
    }
  },
  CONDITION: {
    EXHAUSTED: {
      NAME: 'exhausted',
      DESCRIPTION: () => 'Cannot attack this turn.'
    }
  }
};

