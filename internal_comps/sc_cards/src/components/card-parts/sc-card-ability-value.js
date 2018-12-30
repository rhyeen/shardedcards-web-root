import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCardStyles } from '../../entities/sc_card-styles.js';

import { ScIconsStyles } from '../../../../sc_shared/src/entities/sc-icons.js';
import { Ability } from '../../entities/selected-card.js';

class ScCardAbilityValue extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCardStyles}
      ${ScIconsStyles}
      <style>
        /** @TODO: determine if these should be moved to ScCardStyles as well as sc-card-condition-value styles
            since they are identical **/
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
    return html`${Ability.getName(this.ability.id)}`;
  }

  _cardAbilityTooltipDescription() {
    return html`${Ability.getDescription(this.ability.id, this.ability.amount)}`;
  }

  _cardAbilityIcon() {
    return html`${Ability.getIcon(this.ability.id)}`;
  }
}

window.customElements.define('sc-card-ability-value', ScCardAbilityValue);
