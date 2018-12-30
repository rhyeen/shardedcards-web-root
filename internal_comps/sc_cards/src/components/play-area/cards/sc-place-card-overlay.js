import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCardStyles } from '../../../entities/sc_card-styles.js';
import { ScMinionCardOverlayStyle } from './sc-minion-card-overlay-styles.js';
import {
  DeadIcon,
  ShieldIcon } from '../../../../../sc_shared/src/entities/sc-icons.js';
import { summonMinion } from '../../../services/card-actions.js';
import * as Cards from '../../../services/card-selection.js';

class ScPlaceCardOverlay extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCardStyles}
      ${ScMinionCardOverlayStyle}
      <style>
        [minion-overlay-separator] {
          opacity: ${this._getCardSeparatorOpacity()};
        }
      </style>
      <div minion-overlay-top>${this._getReplacedResultHtml()}</div>
      <div minion-overlay-separator></div>
      <div minion-overlay-bottom>${this._getReplacerResultHtml()}</div>
    `;
  }

  static get properties() { 
    return {
      replacer: { type: Object },
      replaced: { type: Object }
    }
  }

  _getCardSeparatorOpacity() {
    return !this.replaced ? '0' : '1';
  }

  _getReplacedResultHtml() {
    return !this.replaced ? html`` : DeadIcon(); 
  }

  _getReplacerResultHtml() {
    if (!this.replaced) {
      return this._getShieldResultHtml(0);
    }
    let _replacer = this._deepCopy(this.replacer);
    let _replaced = this._deepCopy(this.replaced);
    let updatedCards = summonMinion(_replacer, _replaced);
    _replacer = Cards.getUpdatedCard(_replacer, updatedCards);
    _replaced = Cards.getUpdatedCard(_replaced, updatedCards);
    let currentShield = 0;
    if (this.replacer.conditions.shield) {
      currentShield = this.replacer.conditions.shield;
    }
    let newShield = 0;
    if (_replacer.conditions.shield) {
      newShield = _replacer.conditions.shield;
    }
    return this._getShieldResultHtml(newShield - currentShield);
  }

  _deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  _getShieldResultHtml(gainedShield) {
    return gainedShield <= 0 ? html`` : html`+${gainedShield} ${ShieldIcon()}`;
  }
}

window.customElements.define('sc-place-card-overlay', ScPlaceCardOverlay);