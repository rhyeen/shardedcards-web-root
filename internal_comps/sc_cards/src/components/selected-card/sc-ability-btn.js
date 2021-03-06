import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCardStyles, ABILITY } from '../../entities/sc_card-styles.js';

import { ScIconsStyles } from '../../../../sc_shared/src/entities/sc-icons.js';
import { Ability } from '../../entities/selected-card.js';
import { ScBtnBaseStyle, BTN_COLORS } from '../../../../sc_shared/src/components/sc-btn-base-style.js';

class ScAbilityBtn extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCardStyles}
      ${ScIconsStyles}
      ${ScBtnBaseStyle}
      <style>
        button {
          line-height: normal; /** reset ScBtnBaseStyle's line-height */
          height: 45px;
          text-align: left;
          text-transform: none;
          background-color: var(${ABILITY.CAST.COLOR});
          color: var(${BTN_COLORS.DARK_BTN_TEXT_COLOR});
        }

        .button-svg-icon {
          fill: var(${BTN_COLORS.DARK_BTN_TEXT_COLOR});
        }

        [card-ability] .tooltip-title {
          font-weight: 500;
        }

        [card-ability] .tooltip-description {
          font-weight: 400;
          color: var(${BTN_COLORS.DARK_BTN_TEXT_COLOR});
        }
        [card-ability][disabled] .tooltip-description {
          color: var(${BTN_COLORS.DISABLED.TEXT_COLOR});
        }
      </style>
      <button card-ability ?disabled="${!!this.ability.used}">
        <div class="icon">${this._cardAbilityIcon()}</div>
        <div class="tooltip">
          <div class="tooltip-title">${this._cardAbilityTooltip()}</div>
          <div class="tooltip-description">${this._cardAbilityTooltipDescription()}</div>
        </div>
      </button>
    `;
  }

  static get properties() { 
    return {
      ability: { type: Object },
      cardVersion: { type: Number }
    }
  }

  _cardAbilityTooltip() {
    return html`${Ability.getName(this.ability.id)}`;
  }

  _cardAbilityTooltipDescription() {
    return html`${Ability.getDescription(this.ability.id, this.ability.amount)}`;
  }

  _cardAbilityIcon() {
    return html`${Ability.getIcon(this.ability.id, 'button-svg-icon')}`;
  }
}

window.customElements.define('sc-ability-btn', ScAbilityBtn);
