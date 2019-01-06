import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCraftingStyles, CRAFTING_PART } from '../../entities/sc_crafting-styles.js';

import { ScIconsStyles } from '../../../../sc_shared/src/entities/sc-icons.js';
import { Ability } from '../../../../sc_cards/src/entities/selected-card.js';
import { ScBtnBaseStyle, BTN_COLORS } from '../../../../sc_shared/src/components/sc-btn-base-style.js';

class ScCraftingPart extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCraftingStyles}
      ${ScIconsStyles}
      ${ScBtnBaseStyle}
      <style>
        button {
          line-height: normal; /** reset ScBtnBaseStyle's line-height */
          height: 45px;
          text-align: left;
          text-transform: none;
          background-color: var(${CRAFTING_PART.BACKGROUND_COLOR});
          color: var(${BTN_COLORS.DARK_BTN_TEXT_COLOR});
        }

        .button-svg-icon {
          fill: var(${BTN_COLORS.DARK_BTN_TEXT_COLOR});
        }

        [card-part] {
          display: flex;
          align-items: center;
          font-size: 18px;
        }

        [card-part] .tooltip {
          margin-left: 15px;
        }

        [card-part] .tooltip-title {
          font-weight: 500;
          text-transform: uppercase;
          font-size: 16px;
        }

        [card-part] .tooltip-description {
          font-weight: 400;
          font-size: 12px;
          color: var(${BTN_COLORS.DARK_BTN_TEXT_COLOR});
        }
        [card-part][disabled] .tooltip-description {
          color: var(${BTN_COLORS.DISABLED.TEXT_COLOR});
        }
      </style>
      <button card-part ?disabled="${false}">
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
      craftingPart: { type: Object }
    }
  }

  _cardAbilityTooltip() {
    return html`${Ability.getName(this.craftingPart.ability.id)}`;
  }

  _cardAbilityTooltipDescription() {
    return html`${Ability.getDescription(this.craftingPart.ability.id, this.craftingPart.ability.amount)}`;
  }

  _cardAbilityIcon() {
    return html`${Ability.getIcon(this.craftingPart.ability.id, 'button-svg-icon')}`;
  }
}

window.customElements.define('sc-crafting-part', ScCraftingPart);