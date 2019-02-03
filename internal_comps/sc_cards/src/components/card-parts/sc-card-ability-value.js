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
      ability: { type: Object }
    }
  }

  _cardAbilityTooltip() {
    return Ability.getName(this.ability.id);
  }

  _cardAbilityTooltipDescription() {
    return Ability.getDescription(this.ability.id, this.ability.amount);
  }

  _cardAbilityIcon() {
    return Ability.getIcon(this.ability.id);
  }
}

window.customElements.define('sc-card-ability-value', ScCardAbilityValue);
