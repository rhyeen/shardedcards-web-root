import { html } from '@polymer/lit-element';
import { APP_COLORS } from '../../../sc_shared/src/entities/sc-shared-styles.js';

export const CARDS = {
  HAND: {
    HEIGHT: '--hand-card-height',
    WIDTH: '--hand-card-width',
    HOVER_RAISE_HEIGHT: '--hand-card-hover-raise-height',
    PADDING: '--hand-card-padding',
    BORDER_RADIUS: '--hand-card-border-radius',
    ELEVATION: '--hand-card-elevation'
  }
};

export const AREAS = {
  PLAYER_HAND: {
    HEIGHT: '--player-hand-height',
    MARGIN: '--player-hand-margin'
  }
};

export const ScCardStyles = html`
<style>
  :host {
    --hand-card-height: 32px;
    --hand-card-width: 350px;
    --hand-card-hover-raise-height: 10px;
    --hand-card-padding: 16px;
    --hand-card-border-radius: 16px;
    /** @DEBUG: should this be part of the generic elevations? **/
    --hand-card-elevation: 0px -4px 20px rgba(0, 0, 0, 0.15);

    --last-hand-card-extra-height: 4px;
    --player-hand-height: calc(5*var(--hand-card-height) + var(--last-hand-card-extra-height));
    --player-hand-margin: 10px;
  }
</style>
`;
