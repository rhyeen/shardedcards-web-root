import { html } from '@polymer/lit-element';
import { CARDS } from '../../../sc_cards/src/entities/sc_card-styles';

export const CRAFTING_AREA = {
  MAX_WIDTH: '--sc_craft-play-area-max-width'
};

export const CRAFTING_PARTS = {
  HEIGHT: '--sc_craft-crafting-parts-height'
};

export const CRAFTING_PART = {
  BACKGROUND_COLOR: '--sc_craft-crafting-part-background-color',
};

export const FORGE = {
  WIDTH: '--sc_craft-forge-width',
  HEIGHT: '--sc_craft-forge-height',
  ELEVATION: '--sc_craft-forge-elevation',
  BACKGROUND_COLOR: '--sc_craft-forge-background-color',
  BORDER_RADIUS: '--sc_craft-forge-border-radius',
  ICON: {
    WIDTH: '--sc_craft-forge-icon-width',
    HEIGHT: '--sc_craft-forge-icon-height',
    COLOR: '--sc_craft-forge-icon-color'
  },
  PADDING: '--sc_craft-forge-padding'
};

export const CRAFTING_CARDS = {
  CRAFTING_BASE_CARD_COVER: {
    HEIGHT: CARDS.MINION_COVER.HEIGHT,
    WIDTH: CARDS.MINION_COVER.WIDTH,
    PADDING: CARDS.MINION_COVER.PADDING
  },
  FORGE_COVER: {
    HEIGHT: FORGE.HEIGHT,
    WIDTH: FORGE.WIDTH,
    PADDING: FORGE.PADDING,
    BORDER_RADIUS: FORGE.BORDER_RADIUS,
    FORGE_CARD_BORDER: '--sc_craft-crafting-cards-cover-forge-card-border',
    BACKGROUND_COLOR: CARDS.MINION_COVER.BACKGROUND_COLOR,
    BORDER_SIZE: CARDS.MINION_COVER.BORDER_SIZE
  }
};


export const ScCraftingStyles = html`
<style>
  :host {
    --sc_craft-crafting-parts-height: 240px; /* just some number */
    --sc_craft-play-area-max-width: 500px;
    --sc_craft-crafting-part-background-color: #7E57C2;

    --sc_craft-forge-width: 90px;
    --sc_craft-forge-height: 130px;
    --sc_craft-forge-border-radius: 12px; /* NOTE: a normal card's is 8px, so 12px seems to work well for correct corner bubble. */
    --sc_craft-forge-elevation: inset 1px 1px 5px rgba(0, 0, 0, 0.4);
    --sc_craft-forge-background-color: #ECEFF1;
    --sc_craft-forge-icon-width: 32px;
    --sc_craft-forge-icon-height: 32px;
    --sc_craft-forge-icon-color: #CFD8DC;
    --sc_craft-forge-padding: 4px;

    
    --sc_craft-crafting-cards-cover-forge-card-border: var(${CRAFTING_CARDS.FORGE_COVER.BORDER_SIZE}) dashed #2196F3;
    /* --sc_craft-crafting-cards-cover-forge-card-width: calc(var(${FORGE.WIDTH}) + 2*var(${FORGE.PADDING})); */
    /* --sc_craft-crafting-cards-cover-forge-card-height: calc(var(${FORGE.HEIGHT}) + 2*var(${FORGE.PADDING})); */
    /* --sc_craft-crafting-cards-cover-forge-card-width: var(${FORGE.WIDTH}); */
    /* --sc_craft-crafting-cards-cover-forge-card-height: var(${FORGE.HEIGHT}); */
  }


  [card-slot] {
    display: flex;
    align-items: center;
    font-size: 18px;
    padding: 5px 0;
    margin: 5px 0;
  }

  [card-slot] .tooltip {
    margin-left: 15px;
  }

  [card-slot] .tooltip-title {
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 300;
  }

  [card-slot] .tooltip-description {
    font-size: 12px;
    color: #757575;
  }
</style>
`;
