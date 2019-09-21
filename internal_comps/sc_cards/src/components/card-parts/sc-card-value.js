import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles, APP_COLORS } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCardStyles } from '../../entities/sc_card-styles.js';

import {
  ScIconsStyles,
  AttackIcon,
  EnergyIcon,
  HealthIcon,
  RangeIcon,
  ShieldIcon } from '../../../../sc_shared/src/entities/sc-icons.js';
import { CARD_STATS } from '../../../../sc_shared/src/entities/card-keywords.js';
import { roundToTwoDecimals } from '../../../../sc_shared/src/services/util.js';

export const VALUE_TYPES = {
  ...CARD_STATS
};

class ScCardValue extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCardStyles}
      ${ScIconsStyles}
      <style>
        :host {
          display: ${this._getDisplay()};
        }

        [card-part] {
          display: flex;
          align-items: center;
          font-size: 18px;
        }

        [card-part].reduced-card-part {
          font-size: 14px;
        }

        [card-part].stack-card-part {
          flex-direction: column;
        }

        [card-part].no-value-card-part {
          display: none;
        }

        [card-part] .icon,
        [card-part] .current,
        [card-part] .modified {
          display: flex;
          align-items: center;
        }

        [card-part] .modified {
          margin-left: 5px;
          font-size: 14px;
          color: var(${APP_COLORS.PRIMARY_BLUE});
        }

        [card-part] .icon .background-svg-icon {
          fill: var(${APP_COLORS.SVG_DEFAULT});
        }

        [card-part].reduced-card-part .icon .background-svg-icon {
          width: 15px;
          height: 15px;
        }
      </style>
      <div card-part class="${this._cardPartClasses()}">
        <div class="current">${this._cardPartValue()}</div>
        ${this._getModifiedValueHtml()}
        <div class="icon">${this._cardPartIcon()}</div>
      </div>
    `;
  }

  static get properties() { 
    return {
      card: { type: Object },
      modifiedCard: { type: Object },
      cardversion: { type: Number },
      valueType: { type: String },
      stack: { type: Boolean },
      reduced: { type: Boolean },
    }
  }

  _getModifiedValueHtml() {
    if (!this.modifiedCard) {
      return html``;
    }
    const currentValue = this._getValue(this.card, true);
    const modifiedValue = this._getValue(this.modifiedCard, true);
    const modifier = modifiedValue - currentValue;
    if (!modifier) {
      return html``;
    }
    let modifierSign = '';
    if (modifier > 0) {
      modifierSign = '+';
    }
    return html`<div class="modified">(${modifierSign}${modifier})</div>`;
  }

  _getValue(card, returnNumber) {
    let nullValue = html``;
    if (returnNumber) {
      nullValue = 0;
    }
    switch (this.valueType) {
      case VALUE_TYPES.ATTACK:
        return card.attack;
      case VALUE_TYPES.COST:
        return roundToTwoDecimals(card.cost, 2);
      case VALUE_TYPES.HEALTH:
        return card.health;
      case VALUE_TYPES.RANGE:
        return card.range;
      case VALUE_TYPES.SHIELD:
        if (!card.conditions) {
          return nullValue;
        }
        return card.conditions.shield;
      default:
        return 0;
    }
  }

  _getDisplay() {
    if (this.valueType !== VALUE_TYPES.SHIELD) {
      return 'block';
    }
    if (!this.card.conditions || !this.card.conditions.shield) {
      return 'none';
    }
    return 'block';
  }

  _cardPartValue() {
    return this._getValue(this.card);
  }

  _cardPartIcon() {
    let iconFunction;
    switch (this.valueType) {
      case VALUE_TYPES.ATTACK:
        iconFunction = AttackIcon;
        break;
      case VALUE_TYPES.COST:
        iconFunction = EnergyIcon;
        break;
      case VALUE_TYPES.HEALTH:
        iconFunction = HealthIcon;
        break;
      case VALUE_TYPES.RANGE:
        iconFunction = RangeIcon;
        break;
      case VALUE_TYPES.SHIELD:
        iconFunction = ShieldIcon;
        break;
      default:
        return html``;
    }
    // @DEBUG: can't remember why we need to add this class...
    return iconFunction('background-svg-icon');
  }

  _cardPartClasses() {
    let classes = [];
    if (this.stack) {
      classes.push('stack-card-part');
    }
    if (this.reduced) {
      classes.push('reduced-card-part');
    }
    const cardValue = this._cardPartValue();
    if (!cardValue && cardValue !== 0) {
      classes.push('no-value-card-part');
    }
    return classes.join(' ');
  }
}

window.customElements.define('sc-card-value', ScCardValue);
