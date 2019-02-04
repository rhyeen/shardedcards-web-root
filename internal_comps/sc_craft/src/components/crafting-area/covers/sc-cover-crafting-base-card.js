import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCraftingCardCoverStyle } from './sc-crafting-card-cover-style.js';

class ScCoverCraftingBaseCard extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCraftingCardCoverStyle}
      <style>
        [crafting-cover-separator] {
          opacity: 0;
        }
      </style>
      <div crafting-cover-top></div>
      <div crafting-cover-separator></div>
      <div crafting-cover-bottom></div>
    `;
  }
}

window.customElements.define('sc-cover-crafting-base-card', ScCoverCraftingBaseCard);