import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCardStyles, CARDS } from '../../../entities/sc_card-styles.js';
import { ScMinionCardCoverStyle } from './sc-minion-card-cover-style.js';
import {
  DeadIcon,
  HealthIcon,
  RangeIcon,
  ScIconsStyles } from '../../../../../sc_shared/src/entities/sc-icons.js';
import * as CardActions from '../../../services/card-actions.js';
import * as Cards from '../../../services/card-selection.js';
import { Ability } from '../../../entities/selected-card.js';
import { CARD_ABILITIES } from '../../../../../sc_shared/src/entities/card-keywords.js';
import * as CardsSelector from '../../../state/selectors.js';
import { localStore } from '../../../state/store.js';

class ScTargetMinionAbilityCover extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCardStyles}
      ${ScMinionCardCoverStyle}
      ${ScIconsStyles}
      <style>
        :host {
          border: var(${CARDS.MINION_COVER.CAST_TARGET_MINION_BORDER});
        }

        [minion-cover-separator] {
          border-bottom: var(${CARDS.MINION_COVER.CAST_TARGET_MINION_BORDER});
        }
      </style>
      <div minion-cover-top>${this._getTargetResultHtml()}</div>
      <div minion-cover-separator></div>
      <div minion-cover-bottom>${this._getCasterResultHtml()}</div>
    `;
  }

  static get properties() { 
    return {
      caster: { type: Object },
      target: { type: Object }
    }
  }

  _getCasterResultHtml() {
    return Ability.getIcon(this.caster.abilityId);
  }

  _getTargetResultHtml() {
    let _caster = this._deepCopy(this.caster);
    let _target = this._deepCopy(this.target);
    const state = localStore.getState();
    let _playerFieldSlots = CardsSelector.getPlayerFieldSlots(state);
    let _opponentFieldSlots = CardsSelector.getOpponentFieldSlots(state);
    let cards = CardsSelector.getCards(state);
    let { updatedCards, opponentFieldSlots } = CardActions.useCardAbility(cards, _target.playAreaIndex, _caster, _playerFieldSlots, _opponentFieldSlots);
    _caster = Cards.getUpdatedCard(_caster, updatedCards);
    _target = Cards.getUpdatedCard(_target, updatedCards);
    switch(this.caster.abilityId) {
      case CARD_ABILITIES.SPELLSHOT:
        return this._getHealthResultHtml(this.target.card.health, _target.card.health, opponentFieldSlots[this.target.playAreaIndex]);
      case CARD_ABILITIES.REACH:
        return this._getRangeResultHtml(this.target.card.range, _target.card.range);
      default:
        Log.error(`unexpected ability: ${this.caster.abilityId}`);
        return html``;
    }
  }

  _deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  _getHealthResultHtml(oldHealth, newHealth, playAreaSlot) {
    if (!playAreaSlot.id) {
      return DeadIcon();
    }
    return html`${this._getModification(newHealth - oldHealth)} ${HealthIcon()}`;
  }

  _getRangeResultHtml(oldRange, newRange) {
    return html`${this._getModification(newRange - oldRange)} ${RangeIcon()}`;
  }

  _getModification(modifier) {
    if (modifier > 0) {
      return `+${modifier}`;
    }
    return modifier;
  }
}

window.customElements.define('sc-target-minion-ability-cover', ScTargetMinionAbilityCover);