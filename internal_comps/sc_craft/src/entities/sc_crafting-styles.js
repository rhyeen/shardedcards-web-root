import { html } from '@polymer/lit-element';

export const CRAFTING_AREA = {
  MAX_WIDTH: '--sc_craft-play-area-max-width'
};

export const CRAFTING_PART = {
  BACKGROUND_COLOR: '--sc_craft-crafting-part-background-color',
};

export const ScCraftingStyles = html`
<style>
  :host {
    --sc_craft-play-area-max-width: 500px;
    --sc_craft-crafting-part-background-color: #7E57C2;
  }
</style>
`;
