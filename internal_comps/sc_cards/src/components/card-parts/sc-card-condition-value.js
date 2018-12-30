import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCardStyles } from '../../entities/sc_card-styles.js';

import { ScIconsStyles } from '../../../../sc_shared/src/entities/sc-icons.js';
import { Condition } from '../../entities/selected-card.js';

class ScCardConditionValue extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCardStyles}
      ${ScIconsStyles}
      <style>
        [card-condition] {
          display: flex;
          align-items: center;
          font-size: 18px;
        }

        [card-condition] .tooltip {
          margin-left: 15px;
        }

        [card-condition] .tooltip-title {
          text-transform: uppercase;
          font-size: 16px;
          font-weight: 300;
        }

        [card-condition] .tooltip-description {
          font-size: 12px;
          color: #757575;
        }
      </style>
      <div card-condition>
        <div class="icon">${this._cardConditionIcon()}</div>
        <div class="tooltip">
          <div class="tooltip-title">${this._cardConditionTooltip()}</div>
          <div class="tooltip-description">${this._cardConditionTooltipDescription()}</div>
        </div>
      </div>
    `;
  }

  static get properties() { 
    return {
      card: { type: Object },
      condition: { type: String }
    }
  }

  _cardConditionTooltip() {
    return html`${Condition.getName(this.condition)}`;
  }

  _cardConditionTooltipDescription() {
    return html`${Condition.getDescription(this.condition)}`;
  }

  _cardConditionIcon() {
    return html`${Condition.getIcon(this.condition)}`;
  }
}

window.customElements.define('sc-card-condition-value', ScCardConditionValue);
