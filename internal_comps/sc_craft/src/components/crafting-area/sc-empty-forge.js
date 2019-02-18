import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCraftingStyles, FORGE } from '../../entities/sc_crafting-styles.js';
import { ScIconsStyles, ForgeIcon } from '../../../../sc_shared/src/entities/sc-icons.js';

class ScEmptyForge extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCraftingStyles}
      ${ScIconsStyles}
      <style>
        [forge-mold] {
          display: flex;
          align-items: center;
          justify-content: center;
          width: var(${FORGE.WIDTH});
          height: var(${FORGE.HEIGHT});
          padding: var(${FORGE.PADDING});
          box-shadow: var(${FORGE.ELEVATION});
          border-radius: var(${FORGE.BORDER_RADIUS});
          background-color: var(${FORGE.BACKGROUND_COLOR});
        }

        .forge-mold-icon {
          width: var(${FORGE.ICON.WIDTH});
          height: var(${FORGE.ICON.HEIGHT});
          fill: var(${FORGE.ICON.COLOR});
          margin-left: -4px; /* the anvil icon just appears a bit off-center */
        }
      </style>
      <div forge-mold>${ForgeIcon('forge-mold-icon')}</div>
    `;
  }
}

window.customElements.define('sc-empty-forge', ScEmptyForge);