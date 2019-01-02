import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCardStyles } from '../../../entities/sc_card-styles.js';
import { ScMinionCardOverlayStyle } from './sc-minion-card-overlay-styles.js';
import {
  DeadIcon,
  ShieldIcon,
  ScIconsStyles } from '../../../../../sc_shared/src/entities/sc-icons.js';
import * as CardActions from '../../../services/card-actions.js';
import * as Cards from '../../../services/card-selection.js';

class ScPlaceCardOverlay extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCardStyles}
      ${ScMinionCardOverlayStyle}
      ${ScIconsStyles}
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
    return this._noCardToReplace() ? '0' : '1';
  }

  _noCardToReplace() {
    return !this.replaced || !this.replaced.card;
  }

  _getReplacedResultHtml() {
    return this._noCardToReplace() ? html`` : DeadIcon(); 
  }

  _getReplacerResultHtml() {
    if (this._noCardToReplace()) {
      return this._getShieldResultHtml(0);
    }
    let _replacer = this._deepCopy(this.replacer);
    let _replaced = this._deepCopy(this.replaced);
    let { updatedCards } = CardActions.summonMinion(_replacer, _replaced);
    _replacer = Cards.getUpdatedCard(_replacer, updatedCards);
    _replaced = Cards.getUpdatedCard(_replaced, updatedCards);
    let currentShield = 0;
    if (this.replacer.card.conditions.shield) {
      currentShield = this.replacer.card.conditions.shield;
    }
    let newShield = 0;
    if (_replacer.card.conditions.shield) {
      newShield = _replacer.card.conditions.shield;
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