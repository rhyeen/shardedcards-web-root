import { LitElement, html } from '@polymer/lit-element';

import { CARD_SOURCES, CARD_TARGETS } from '../../../entities/selected-card.js';
import { PLAY_FIELD_OWNER } from '../../../entities/play-field-owner.js';
import * as CardActions from '../../../services/card-actions.js';
import * as Cards from '../../../services/card-selection.js';
import { store } from 'intrastore/src/store';
import { 
  attackMinion,
  playPlayerMinion,
  summonMinion,
  useCardAbility } from '../../../state/actions.js';

import '../cards/sc-minion-card.js';
import './sc-summon-minion-cover.js';
import './sc-attack-card-cover.js';
import './sc-target-minion-ability-cover.js';

class ScCoverFieldCard extends LitElement {
  render() {
    return html`
      ${this._getCardHtml()}
    `;
  }

  static get properties() { 
    return {
      fieldSlot: { type: Object },
      selectedCardWithAbility: { type: Object },
      owner: { type: String }
    }
  }

  _getCardHtml() {
    if (this._showAttackCardCover()) {
      return this._attackCardCover();
    }
    if (this._showSelectedPlayerMinion()) {
      return this._selectedPlayerMinion();
    }
    if (this._showPlaceCardCover()) {
      return this._summonMinionCover();
    }
    if (this._showTargetOpponentMinionAbilityCover()) {
      return this._targetOpponentMinionAbilityCover();
    }
    if (this._showTargetPlayerMinionAbilityCover()) {
      return this._targetPlayerMinionAbilityCover();
    }
    return html``;
  }

  _targetedCardInRange() {
    if (!this.fieldSlot.card) {
      return false;
    }
    return CardActions.indexInAttackRange(this.selectedCardWithAbility, this.fieldSlot.playAreaIndex);
  }

  _selectedCardExhausted() {
    return Cards.isExhausted(this.selectedCardWithAbility.card);
  }

  _selectedCardInThisFieldSlot() {
    return this.selectedCardWithAbility.playAreaIndex === this.fieldSlot.playAreaIndex;
  }

  _usingAbilityOnOpponentMinion() {
    return (
      this._usingAbility()
      && this.selectedCardWithAbility.targets === CARD_TARGETS.OPPONENT_MINION
    );
  }

  _usingAbility() {
    return (
      this.selectedCardWithAbility.source === CARD_SOURCES.CAST_PLAYER_SPELL
      || this.selectedCardWithAbility.source === CARD_SOURCES.PLAY_PLAYER_MINION
    );
  }

  _showAttackCardCover() {
    return (
      this.selectedCardWithAbility.source == CARD_SOURCES.SELECT_PLAYER_MINION
      && this.owner == PLAY_FIELD_OWNER.OPPONENT
      && this._targetedCardInRange()
      && !this._selectedCardExhausted()
    );
  }

  _showSelectedPlayerMinion() {
    return (
      this.selectedCardWithAbility.source == CARD_SOURCES.SELECT_PLAYER_MINION
      && this.owner == PLAY_FIELD_OWNER.PLAYER
      && this._selectedCardInThisFieldSlot()
    );
  }

  _showPlaceCardCover() {
    return (
      this.selectedCardWithAbility.source == CARD_SOURCES.SUMMON_PLAYER_MINION
      && this.owner == PLAY_FIELD_OWNER.PLAYER
    );
  }

  _showTargetOpponentMinionAbilityCover() {
    return (
      this._usingAbilityOnOpponentMinion()
      && this.owner == PLAY_FIELD_OWNER.OPPONENT
    );
  }

  _showTargetPlayerMinionAbilityCover() {
    return (
      this._usingAbilityOnOpponentMinion()
      && this.owner == PLAY_FIELD_OWNER.OPPONENT
    );
  }

  _attackCardCover() {
    return html`
      <sc-attack-card-cover
          .attacker="${this.selectedCardWithAbility}"
          .attacked="${this.fieldSlot}"
          @click="${this._attackCardCoverClicked}"></sc-attack-card-cover>
    `;
  }

  _attackCardCoverClicked() {
    store.dispatch(attackMinion.request(this.fieldSlot.playAreaIndex));
  }

  _selectedPlayerMinion() {
    return html`
      <sc-minion-card
          .card="${this.selectedCardWithAbility.card}"
          @click="${this._selectedPlayerMinionClicked}"></sc-minion-card>
    `;
  }

  _selectedPlayerMinionClicked() {
    store.dispatch(playPlayerMinion());
  }

  _summonMinionCover() {
    return html`
      <sc-summon-minion-cover
          .replacer="${this.selectedCardWithAbility}"
          .replaced="${this.fieldSlot}"
          @click="${this._summonMinionCoverClicked}"></sc-summon-minion-cover>
    `;
  }

  _summonMinionCoverClicked() {
    store.dispatch(summonMinion.request(this.fieldSlot.playAreaIndex));
  }

  _targetOpponentMinionAbilityCover() {
    return html`
      <sc-target-minion-ability-cover
          .caster="${this.selectedCardWithAbility}"
          .target="${this.fieldSlot}"
          @click="${this._targetOpponentMinionAbilityCoverClicked}"></sc-target-minion-ability-cover>
    `;
  }

  _targetOpponentMinionAbilityCoverClicked() {
    store.dispatch(useCardAbility.request(this.fieldSlot.playAreaIndex));
  }

  _targetPlayerMinionAbilityCover() {
    return html`
      <sc-target-minion-ability-cover
          .caster="${this.selectedCardWithAbility}"
          .target="${this.fieldSlot}"
          @click="${this._targetPlayerMinionAbilityCoverClicked}"></sc-target-minion-ability-cover>
    `;
  }

  _targetPlayerMinionAbilityCoverClicked() {
    store.dispatch(useCardAbility.request(this.fieldSlot.playAreaIndex));
  }
}

window.customElements.define('sc-cover-field-card', ScCoverFieldCard);