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
      <div card-ability class="${this._getCardAbilityClasses()}">
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
      ability: { type: Object },
      modifiedAbility: { type: Object }
    }
  }

  _getCardAbilityClasses() {
    if (!this.ability.id) {
      return 'proposed';
    }
  }

  _cardAbilityTooltip() {
    if (!this.ability.id) {
      return Ability.getName(this.modifiedAbility.id);
    }
    return Ability.getName(this.ability.id);
  }

  _cardAbilityTooltipDescription() {
    if (!this.ability.id) {
      return Ability.getDescription(this.modifiedAbility.id, this.modifiedAbility.amount);
    }
    if (this.modifiedAbility && this.modifiedAbility.id && this.modifiedAbility.amount !== this.ability.amount) {
      return Ability.getModifiedDescription(this.ability.id, this.ability.amount, this.modifiedAbility.amount);
    }
    return Ability.getDescription(this.ability.id, this.ability.amount);
  }

  _cardAbilityIcon() {
    if (!this.ability.id) {
      return Ability.getIcon(this.modifiedAbility.id);
    }
    return Ability.getIcon(this.ability.id);
  }
}

window.customElements.define('sc-card-ability-value', ScCardAbilityValue);
