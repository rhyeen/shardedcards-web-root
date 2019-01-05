import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCardStyles, CARDS } from '../../../entities/sc_card-styles.js';
import { ScMinionCardCoverStyle } from './sc-minion-card-cover-style.js';
import {
  DeadIcon,
  HealthIcon,
  ScIconsStyles } from '../../../../../sc_shared/src/entities/sc-icons.js';
import * as CardActions from '../../../services/card-actions.js';
import * as Cards from '../../../services/card-selection.js';
import * as CardsSelector from '../../../state/selectors.js';
import { localStore } from '../../../state/store.js';

class ScAttackCardCover extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCardStyles}
      ${ScMinionCardCoverStyle}
      ${ScIconsStyles}
      <style>
        :host {
          border: var(${CARDS.MINION_COVER.ATTACK_MINION_BORDER});
        }
        [minion-cover-separator] {
          border-bottom: var(${CARDS.MINION_COVER.ATTACK_MINION_BORDER});
        }
      </style>
      <div minion-cover-top>${this._getAttackedResultHtml()}</div>
      <div minion-cover-separator></div>
      <div minion-cover-bottom>${this._getAttackerResultHtml()}</div>
    `;
  }

  static get properties() { 
    return {
      attacker: { type: Object },
      attacked: { type: Object }
    }
  }

  _getAttackedResultHtml() {
    let { updatedAttacked, attackedDiscarded } = this._getAttackResult();
    return this._getHealthResultHtml(this.attacked.card.health, updatedAttacked.card.health, attackedDiscarded);
  }

  _getAttackerResultHtml() {
    let { updatedAttacker, attackerDiscarded } = this._getAttackResult();
    return this._getHealthResultHtml(this.attacker.card.health, updatedAttacker.card.health, attackerDiscarded);
  }

  _getAttackResult() {
    let updatedAttacker = this._deepCopy(this.attacker);
    let updatedAttacked = this._deepCopy(this.attacked);
    const state = localStore.getState();
    let cards = CardsSelector.getCards(state);
    let { updatedCards, attackedDiscarded, attackerDiscarded } = CardActions.attackMinion(cards, updatedAttacker, updatedAttacked);
    updatedAttacker = Cards.getUpdatedCard(updatedAttacker, updatedCards);
    updatedAttacked = Cards.getUpdatedCard(updatedAttacked, updatedCards);
    return { updatedAttacker, updatedAttacked, attackedDiscarded, attackerDiscarded };
  }

  _deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  
  _getHealthResultHtml(oldHealth, newHealth, isDiscarded) {
    if (isDiscarded) {
      return DeadIcon();
    }
    return html`${this._getModification(newHealth - oldHealth)} ${HealthIcon()}`;
  }

  _getModification(modifier) {
    if (modifier > 0) {
      return `+${modifier}`;
    }
    return modifier;
  }
}

window.customElements.define('sc-attack-card-cover', ScAttackCardCover);