import { html } from '@polymer/lit-element';

export const CRAFTING_AREA = {
  MAX_WIDTH: '--sc_craft-play-area-max-width'
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
  }
}

export const ScCraftingStyles = html`
<style>
  :host {
    --sc_craft-play-area-max-width: 500px;
    --sc_craft-crafting-part-background-color: #7E57C2;

    --sc_craft-forge-width: 90px;
    --sc_craft-forge-height: 130px;
    --sc_craft-forge-border-radius: 8px;
    --sc_craft-forge-elevation: inset 1px 1px 5px rgba(0, 0, 0, 0.4);
    --sc_craft-forge-background-color: #ECEFF1;
    --sc_craft-forge-icon-width: 32px;
    --sc_craft-forge-icon-height: 32px;
    --sc_craft-forge-icon-color: #CFD8DC;
  }
</style>
`;
