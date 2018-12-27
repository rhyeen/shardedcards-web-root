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

import './sc-minion-card.js';

class ScOverlayFieldCard extends LitElement {
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
    if (this._showAttackCardOverlay()) {
      return this._attackCardOverlay();
    }
    if (this._showSelectedPlayerMinion()) {
      return this._selectedPlayerMinion();
    }
    if (this._showPlaceCardOverlay()) {
      return this._placeCardOverlay();
    }
    if (this._showTargetOpponentMinionAbilityOverlay()) {
      return this._targetOpponentMinionAbilityOverlay();
    }
    if (this._showTargetPlayerMinionAbilityOverlay()) {
      return this._targetPlayerMinionAbilityOverlay();
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

  _showAttackCardOverlay() {
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

  _showPlaceCardOverlay() {
    return (
      this.selectedCardWithAbility.source == CARD_SOURCES.SELECT_PLAYER_HAND
      && this.owner == PLAY_FIELD_OWNER.PLAYER
    );
  }

  _showTargetOpponentMinionAbilityOverlay() {
    return (
      this._usingAbilityOnOpponentMinion()
      && this.owner == PLAY_FIELD_OWNER.OPPONENT
    );
  }

  _showTargetPlayerMinionAbilityOverlay() {
    return (
      this._usingAbilityOnOpponentMinion()
      && this.owner == PLAY_FIELD_OWNER.OPPONENT
    );
  }

  _attackCardOverlay() {
    return html`
      <sc-attack-card-overlay
          .attacker="${this.selectedCardWithAbility.card}"
          .attacking="${this.fieldSlot.card}"
          @click="${this._attackCardOverlayClicked}"></sc-attack-card-overlay>
    `;
  }

  _attackCardOverlayClicked() {
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

  _placeCardOverlay() {
    return html`
      <sc-place-card-overlay
          .replacer="${this.selectedCardWithAbility.card}"
          .replacing="${this.fieldSlot.card}"
          @click="${this._placeCardOverlayClicked}"></sc-place-card-overlay>
    `;
  }

  _placeCardOverlayClicked() {
    store.dispatch(summonMinion.request(this.fieldSlot.playAreaIndex));
  }

  _targetOpponentMinionAbilityOverlay() {
    return html`
      <sc-target-minion-ability-overlay
          .caster="${this.selectedCardWithAbility.card}"
          .ability="${this.selectedCardWithAbility.ability}"
          .target="${this.fieldSlot.card}"
          @click="${this._targetOpponentMinionAbilityOverlayClicked}"></sc-target-minion-ability-overlay>
    `;
  }

  _targetOpponentMinionAbilityOverlayClicked() {
    store.dispatch(useCardAbility(this.fieldSlot.playAreaIndex));
  }

  _targetPlayerMinionAbilityOverlay() {
    return html`
      <sc-target-minion-ability-overlay
          .caster="${this.selectedCardWithAbility.card}"
          .ability="${this.selectedCardWithAbility.ability}"
          .target="${this.fieldSlot.card}"
          @click="${this._targetPlayerMinionAbilityOverlayClicked}"></sc-target-minion-ability-overlay>
    `;
  }

  _targetPlayerMinionAbilityOverlayClicked() {
    store.dispatch(useCardAbility(this.fieldSlot.playAreaIndex));
  }
}

window.customElements.define('sc-overlay-field-card', ScOverlayFieldCard);