import { html } from '@polymer/lit-element';
import { Log } from '../services/logger.js';

import { CARD_RARITIES } from './card-keywords.js';

export const CARD_RARITIES_COLOR = {
  UNDEFINED: '--sc_shared-card-rarity-undefined-color',
  COMMON: '--sc_shared-card-rarity-common-color',
  RARE: '--sc_shared-card-rarity-rare-color',
  EPIC: '--sc_shared-card-rarity-epic-color',
  LEGENDARY: '--sc_shared-card-rarity-legendary-color',
  STANDARD: '--sc_shared-card-rarity-standard-color'
};

export const APP_COLORS = {
  NEAR_BLACK: '--sc_shared-near-black',
  NEAR_WHITE: '--sc_shared-near-white',
  BASE_WHITE: '--sc_shared-base-white',
  NEAR_WHITE_BORDER: '--sc_shared-near-white-border',
  OFF_BLACK: '--sc_shared-off-black',
  OVERLAY_BLACK: '--sc_shared-overlay-black',
  OVERLAY_WHITE: '--sc_shared-overlay-white',
  OVERLAY_CARD_WHITE: '--sc_shared-overlay-card-white',
  SVG_DEFAULT: '--sc_shared-default-svg-color'
};

export const SHADOW_ELEVATIONS = {
  LEVEL_1: {
    BASE: '--sc_shared-elevation-1',
    INSET: '--sc_shared-elevation-n1',
    HOVER: '--sc_shared-elevation-h1'
  },
  SIDE_BAR: {
    BASE: '--sc_shared-elevation-side-bar'
  }
};

export const CardRarityColor = function(rarity) {
  switch (rarity) {
    case CARD_RARITIES.UNDEFINED:
      return CARD_RARITIES_COLOR.UNDEFINED;
    case CARD_RARITIES.COMMON:
      return CARD_RARITIES_COLOR.COMMON;
    case CARD_RARITIES.RARE:
      return CARD_RARITIES_COLOR.RARE;
    case CARD_RARITIES.EPIC:
      return CARD_RARITIES_COLOR.EPIC;
    case CARD_RARITIES.LEGENDARY:
      return CARD_RARITIES_COLOR.LEGENDARY;
    case CARD_RARITIES.STANDARD:
      return CARD_RARITIES_COLOR.STANDARD;
    default:
      Log.error(`undefined rarity: ${rarity}`);
      return CARD_RARITIES.COMMON_COLOR;
  }
}

export const ScSharedStyles = html`
<style>
  :host {
    --sc_shared-card-rarity-undefined-color: #EFEBE9;
    --sc_shared-card-rarity-common-color: #B0BEC5;
    --sc_shared-card-rarity-rare-color: #64B5F6;
    --sc_shared-card-rarity-epic-color: #BA68C8;
    --sc_shared-card-rarity-legendary-color: #FFD54F;
    --sc_shared-card-rarity-standard-color: #B2DFDB;

    --sc_shared-near-black: #222426;
    --sc_shared-near-white: #F7FBFF;
    --sc_shared-base-white: #FFF;
    --sc_shared-near-white-border: #E7EBEF;
    --sc_shared-off-black: #525456;
    
    --sc_shared-overlay-black: rgba(0, 0, 0, 0.5);
    --sc_shared-overlay-white: rgba(255, 255, 255, 0.8);
    --sc_shared-overlay-card-white: rgba(255, 255, 255, 0.5);

    --sc_shared-elevation-1: 1px 1px 5px rgba(0, 0, 0, 0.4);
    --sc_shared-elevation-n1: inset 1px 1px 5px rgba(0, 0, 0, 0.4);
    --sc_shared-elevation-h1:
      1px 1px 5px rgba(0, 0, 0, 0.4),
      inset 0px 0px 80px rgba(0, 0, 0, 0.1);
    --sc_shared-elevation-side-bar: -2px 0px 10px rgba(0, 0, 0, 0.1);
  }

  button:focus {
    outline: 0;
  }

  a:link, a:visited {
    text-decoration: none;
  }

  [bar-items] {
    position: fixed;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 8px;
    background-color: var(${APP_COLORS.BASE_WHITE});
    align-items: center;
  }

  [bar-items] .item-group {
    display: flex;
    align-items: center;
  }

  [bar-item] {
    display: flex;
    align-items: center;
    font-size: 18px;
  }
  
  /* HACK: it should be setting to 24px regardless, but it is being set to 28px instead,
     and I'm unsure why... */
  [bar-item] .icon {
    height: 24px;
  }
</style>
`;
