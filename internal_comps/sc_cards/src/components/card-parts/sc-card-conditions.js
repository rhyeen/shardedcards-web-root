import { LitElement, html } from '@polymer/lit-element';

import './sc-card-condition-value.js';
import { CARD_CONDITIONS } from '../../../../sc_shared/src/entities/card-keywords.js';

class ScCardConditions extends LitElement {
  render() {
    return html`${this._getConditionsHtml()}`;
  }

  static get properties() { 
    return {
      card: { type: Object }
    }
  }

  _getConditionsHtml() {
    if (!this.card.conditions) {
      return html``;
    }
    let conditionsHtml = [];
    if (this.card.conditions.exhausted) {
      conditionsHtml.push(this._getExhaustedConditionHtml());
    }
    return html`${conditionsHtml}`;
  }

  _getExhaustedConditionHtml() {
    return html`
      <sc-card-condition-value
          .card="${this.card}"
          .condition="${CARD_CONDITIONS.EXHAUSTED}"></sc-card-condition-value>`;
  }
}

window.customElements.define('sc-card-conditions', ScCardConditions);
