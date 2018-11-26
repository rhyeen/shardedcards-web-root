import { html } from '@polymer/lit-element';
import { APP_COLORS } from '../../../sc_shared/src/entities/sc-shared-styles.js';

export const NAV = {
  HEADER: {
    HEIGHT: '--nav-header-height',
    BORDER: '--nav-header-border'
  },
  FOOTER: {
    HEIGHT: '--nav-footer-height',
    BORDER: '--nav-footer-border'
  }
}

export const sc_gameStyles = html`
<style>
  :host {
    --nav-header-height: 46px;
    --nav-footer-height: 46px;
    --nav-header-border: 1px solid var(${APP_COLORS.NEAR_WHITE_BORDER});
    --nav-footer-border: 1px solid var(${APP_COLORS.NEAR_WHITE_BORDER});
  }
</style>
`;
