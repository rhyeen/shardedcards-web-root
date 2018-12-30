import { LitElement, html } from '@polymer/lit-element';

import './sc-card-ability-value.js';

class ScCardAbilities extends LitElement {
  render() {
    return html`${this._getAbilitiesHtml()}`;
  }

  static get properties() { 
    return {
      card: { type: Object }
    }
  }

  _getAbilitiesHtml() {
    if (!this.card.abilities) {
      return html``;
    }
    return html`${this.card.abilities.map(ability => this._getAbilityHtml(ability))}`;
  }

  _getAbilityHtml(ability) {
    return html`
      <sc-card-ability-value
          .card="${this.card}"
          .ability="${ability}"></sc-card-ability-value>`;
  }
}

window.customElements.define('sc-card-abilities', ScCardAbilities);
