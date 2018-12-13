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

export const VALUE_TYPES = {
  ATTACK: 'attack',
  COST: 'cost',
  HEALTH: 'health',
  RANGE: 'range',
  SHIELD: 'sheild'
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
        <div class="icon">${this._cardPartIcon()}</div>
      </div>
    `;
  }

  static get properties() { 
    return {
      card: { type: Object },
      cardversion: { type: Number },
      valueType: { type: String },
      stack: { type: Boolean },
      reduced: { type: Boolean } 
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
    switch (this.valueType) {
      case PART_TYPE_ATTACK:
        return this.card.attack;
      case PART_TYPE_COST:
        return this.card.cost;
      case PART_TYPE_HEALTH:
        return this.card.health;
      case PART_TYPE_RANGE:
        return this.card.range;
      case PART_TYPE_SHIELD:
        if (!this.card.conditions) {
          return html``;
        }
        return this.card.conditions.shield;
      default:
        return 0;
    }
  }

  _cardPartIcon() {
    let iconFunction;
    switch(this.valueType) {
      case PART_TYPE_ATTACK:
        iconFunction = AttackIcon;
        break;
      case PART_TYPE_COST:
        iconFunction = EnergyIcon;
        break;
      case PART_TYPE_HEALTH:
        iconFunction = HealthIcon;
        break;
      case PART_TYPE_RANGE:
        iconFunction = RangeIcon;
        break;
      case PART_TYPE_SHIELD:
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
