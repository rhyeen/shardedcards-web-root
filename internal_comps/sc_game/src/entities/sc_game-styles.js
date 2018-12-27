import { html } from '@polymer/lit-element';
import { APP_COLORS } from '../../../sc_shared/src/entities/sc-shared-styles.js';

export const NAV = {
  HEADER: {
    HEIGHT: '--sc_game-nav-header-height',
    BORDER: '--sc_game-nav-header-border'
  },
  FOOTER: {
    HEIGHT: '--sc_game-nav-footer-height',
    BORDER: '--sc_game-nav-footer-border'
  }
}

export const ScGameStyles = html`
<style>
  :host {
    --sc_game-nav-header-height: 46px;
    --sc_game-nav-footer-height: 46px;
    --sc_game-nav-header-border: 1px solid var(${APP_COLORS.NEAR_WHITE_BORDER});
    --sc_game-nav-footer-border: 1px solid var(${APP_COLORS.NEAR_WHITE_BORDER});
  }
</style>
`;
