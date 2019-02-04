import { html } from '@polymer/lit-element';
import { ScCraftingStyles, CRAFTING_CARDS } from '../../../entities/sc_crafting-styles.js';

export const ScCraftingCardCoverStyle = html`
${ScCraftingStyles}
<style>
  :host {
    display: flex;
    flex-direction: column;
    width: calc(var(${CRAFTING_CARDS.FORGE_COVER.WIDTH}) - 2*var(${CRAFTING_CARDS.FORGE_COVER.PADDING}));
    height: calc(var(${CRAFTING_CARDS.FORGE_COVER.HEIGHT}) - 2*var(${CRAFTING_CARDS.FORGE_COVER.PADDING}));
    box-shadow: var(${CRAFTING_CARDS.FORGE_COVER.ELEVATION});
    border-radius: var(${CRAFTING_CARDS.FORGE_COVER.BORDER_RADIUS});
    padding: var(${CRAFTING_CARDS.FORGE_COVER.PADDING});
    background-color: var(${CRAFTING_CARDS.FORGE_COVER.BACKGROUND_COLOR});
  }


  [crafting-cover-separator] {
    flex: 0, 0, var(${CRAFTING_CARDS.FORGE_COVER.BORDER_SIZE});
    width: 100%;
  }

  [crafting-cover-top],
  [crafting-cover-bottom] {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>
`;
