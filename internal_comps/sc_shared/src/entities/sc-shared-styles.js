import { html } from '@polymer/lit-element';

import { CARD_RARITIES } from './card-keywords.js';

export const CARD_RARITIES_COLOR = {
  UNDEFINED: '--card-rarity-undefined-color',
  COMMON: '--card-rarity-common-color',
  RARE: '--card-rarity-rare-color',
  EPIC: '--card-rarity-epic-color',
  LEGENDARY: '--card-rarity-legendary-color',
  STANDARD: '--card-rarity-standard-color'
};

export const APP_COLORS = {
  NEAR_BLACK: '--near-black',
  NEAR_WHITE: '--near-white',
  BASE_WHITE: '--base-white',
  NEAR_WHITE_BORDER: '--near-white-border',
  OFF_BLACK: '--off-black',
  OVERLAY_BLACK: '--overlay-black',
  OVERLAY_WHITE: '--overlay-white',
  OVERLAY_CARD_WHITE: '--overlay-card-white',
  SVG_DEFAULT: '--default-svg-color'
};

export const SHADOW_ELEVATIONS = {
  LEVEL_1: {
    BASE: '--sc-elevation-1',
    INSET: '--sc-elevation-n1',
    HOVER: '--sc-elevation-h1'
  },
  SIDE_BAR: {
    BASE: '--sc-elevation-side-bar'
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
      console.error(`undefined rarity: ${rarity}`);
      return CARD_RARITIES.COMMON_COLOR;
  }
}

export const ScSharedStyles = html`
<style>
  :host {
    --card-rarity-undefined-color: #EFEBE9;
    --card-rarity-common-color: #B0BEC5;
    --card-rarity-rare-color: #64B5F6;
    --card-rarity-epic-color: #BA68C8;
    --card-rarity-legendary-color: #FFD54F;
    --card-rarity-standard-color: #B2DFDB;

    --near-black: #222426;
    --near-white: #F7FBFF;
    --base-white: #FFF;
    --near-white-border: #E7EBEF;
    --off-black: #525456;
    
    --overlay-black: rgba(0, 0, 0, 0.5);
    --overlay-white: rgba(255, 255, 255, 0.8);
    --overlay-card-white: rgba(255, 255, 255, 0.5);

    --sc-elevation-1: 1px 1px 5px rgba(0, 0, 0, 0.4);
    --sc-elevation-n1: inset 1px 1px 5px rgba(0, 0, 0, 0.4);
    --sc-elevation-h1:
      1px 1px 5px rgba(0, 0, 0, 0.4),
      inset 0px 0px 80px rgba(0, 0, 0, 0.1);
    --sc-elevation-side-bar: -2px 0px 10px rgba(0, 0, 0, 0.1);
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
</style>
`;
