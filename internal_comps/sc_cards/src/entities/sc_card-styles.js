import { html } from '@polymer/lit-element';

export const CARDS = {
  HAND: {
    HEIGHT: '--sc_card-hand-card-height',
    WIDTH: '--sc_card-hand-card-width',
    HOVER_RAISE_HEIGHT: '--sc_card-hand-card-hover-raise-height',
    PADDING: '--sc_card-hand-card-padding',
    BORDER_RADIUS: '--sc_card-hand-card-border-radius',
    ELEVATION: '--sc_card-hand-card-elevation'
  },
  MINION: {
    HEIGHT: '--sc_card-minion-card-height',
    WIDTH: '--sc_card-minion-card-width',
    PADDING: '--sc_card-minion-card-padding',
    BORDER_RADIUS: '--sc_card-minion-card-border-radius',
    ELEVATION: '--sc_card-minion-card-elevation',
    EXHAUSTED_OPACITY_VALUE: '0.5'
  },
  FULL: {
    HEIGHT: '--sc_card-full-card-height',
    WIDTH: '--sc_card-full-card-width',
    BACKGROUND_COLOR: '--sc_card-full-card-background-color',
    PADDING: '--sc_card-full-card-padding',
    BORDER_RADIUS: '--sc_card-full-card-border-radius',
    BORDER: '--sc_card-full-card-border',
    ELEVATION: '--sc_card-full-card-elevation'
  }
};

export const AREAS = {
  PLAYER_HAND: {
    HEIGHT: '--sc_card-player-hand-height',
    MARGIN: '--sc_card-player-hand-margin'
  }
};

export const PLAY_AREA = {
  MAX_WIDTH: '--sc_card-play-area-max-width',
  SEPARATOR: {
    BORDER: '--sc_card-play-area-border',
    BORDER_SIZE: '--sc_card-play-area-border-size',
    HEIGHT: '--sc_card-play-area-height',
  }
}

export const ScCardStyles = html`
<style>
  :host {
    --sc_card-hand-card-height: 32px;
    --sc_card-hand-card-width: 350px;
    --sc_card-hand-card-hover-raise-height: 10px;
    --sc_card-hand-card-padding: 16px;
    --sc_card-hand-card-border-radius: 16px;
    --sc_card-hand-card-elevation: 0px -4px 20px rgba(0, 0, 0, 0.15);

    --sc_card-minion-card-height: 130px;
    --sc_card-minion-card-width: 90px;
    --sc_card-minion-card-padding: 4px;
    --sc_card-minion-card-border-radius: 8px;
    --sc_card-minion-card-elevation: 1px 1px 5px rgba(0, 0, 0, 0.4);

    --sc_card-full-card-height: 300px;
    --sc_card-full-card-width: 200px;
    --sc_card-full-card-background-color: #FFF;
    --sc_card-full-card-padding: 16px;
    --sc_card-full-card-border-radius: 8px;
    --sc_card-full-card-border: var(--sc_card-full-card-border-radius) solid #000;
    --sc_card-full-card-elevation: 2px 2px 10px rgba(0, 0, 0, 0.1);

    --sc_card-last-hand-card-extra-height: 4px;
    --sc_card-player-hand-height: calc(5*var(--sc_card-hand-card-height) + var(--sc_card-last-hand-card-extra-height));
    --sc_card-player-hand-margin: 10px;

    --sc_card-play-area-max-width: 500px;
    --sc_card-play-area-border-size: 2px;
    --sc_card-play-area-border: var(--sc_card-play-area-border-size) solid #EEEEEE;
    --sc_card-play-area-height: 8px;
  }

  [field-slot] {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  [field-slot-separator] {
    flex: 0 0 2px;
    background-color: #EEEEEE;
  }

  [field-slot-separator][overlay] {
    background: none;
  }
</style>
`;
