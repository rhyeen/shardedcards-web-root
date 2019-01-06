import { LitElement, html } from '@polymer/lit-element';

import './sc-empty-forge.js';
import '../forging-card/sc-forging-card.js';

class ScCraftingForge extends LitElement {
  render() {
    return this._getForgeContentHtml();
  }

  static get properties() { 
    return {
      overlay: { type: Boolean },
      forgeSlot: { type: Object }
    }
  }

  _getForgeContentHtml() {
    // @TODO: if overlay === true, then we'll likely want to show *-cover elements instead.
    if (this.forgeSlot.card) {
      return html`<sc-forging-card .forgeSlot="${this.forgeSlot}"></sc-forging-card>`;
    }
    return html`<sc-empty-forge></sc-empty-forge>`;
  }
}

window.customElements.define('sc-crafting-forge', ScCraftingForge);