import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCraftingStyles } from '../../entities/sc_crafting-styles.js';
import { ScIconsStyles, ForgeIcon } from '../../../../sc_shared/src/entities/sc-icons.js';

class ScEmptyForge extends connect(localStore)(LitElement) {
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
          /* @TODO: these have got to be fixed...*/
          width: var(--pawn-card-width);
          height: var(--pawn-card-height);
          box-shadow: var(--cc-elevation-n1);
          border-radius: 8px;
          background-color: #ECEFF1;
        }

        .forge-mold-icon {
          width: 32px;
          height: 32px;
          fill: #CFD8DC;
          margin-left: -4px; /* the anvil icon just appears a bit off-center */
        }
      </style>
      <div forge-mold>${ForgeIcon('forge-mold-icon')}</div>
    `;
  }
}

window.customElements.define('sc-crafting-forge', ScEmptyForge);