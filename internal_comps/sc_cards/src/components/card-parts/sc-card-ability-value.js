import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCardStyles } from '../../entities/sc_card-styles.js';

import { ScIconsStyles } from '../../../../sc_shared/src/entities/sc-icons.js';

class ScCardAbilityValue extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCardStyles}
      ${ScIconsStyles}
      <style>
        [card-ability] {
          display: flex;
          align-items: center;
          font-size: 18px;
        }

        [card-ability] .tooltip {
          margin-left: 15px;
        }

        [card-ability] .tooltip-title {
          text-transform: uppercase;
          font-size: 16px;
          font-weight: 300;
        }

        [card-ability] .tooltip-description {
          font-size: 12px;
          color: #757575;
        }
      </style>
      <div card-part class="${this._cardPartClasses()}">
        <div class="current">${this._cardPartValue()}</div>
        <div class="icon">${this._cardPartIcon()}</div>
      </div>

      <div card-ability>
        <div class="icon">${this._cardAbilityIcon()}</div>
        <div class="tooltip">
          <div class="tooltip-title">${this._cardAbilityTooltip()}</div>
          <div class="tooltip-description">${this._cardAbilityTooltipDescription()}</div>
        </div>
      </div>
    `;
  }

  static get properties() { 
    return {
      card: { type: Object },
      ability: { type: String }
    }
  }

  _cardAbilityTooltip() {
    return getAbilityName(this.ability)
  }

  _cardAbilityTooltipDescription() {
    return getAbilityDescription(this.ability)
  }

  _cardAbilityIcon() {
    return getAbilityIcon(this.ability)
  }
}

window.customElements.define('sc-card-ability-value', ScCardAbilityValue);
