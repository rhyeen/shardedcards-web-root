import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles, APP_COLORS } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScGameStyles, NAV } from '../../entities/sc_game-styles.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';

import * as GameSelector from '../../state/selectors.js';
import * as CardsSelector from '../../../../sc_cards/src/state/selectors.js';
import { CARD_SOURCES } from '../../../../sc_cards/src/entities/selected-card.js';
import { END_GAME_STATE } from '../overlay/sc-game-over-overlay.js';

import '../overlay/sc-full-crafting-base-card-overlay.js';
import '../overlay/sc-full-hand-card-overlay.js';
import '../overlay/sc-full-opponent-minion-overlay.js';
import '../overlay/sc-full-player-minion-overlay.js';
import '../overlay/sc-game-menu-overlay.js';
import '../overlay/sc-game-over-overlay.js';
import '../overlay/sc-opponent-turn-overlay';
import '../overlay/sc-play-minion-overlay.js';
import '../overlay/sc-summon-minion-overlay.js';
import '../overlay/sc-target-minion-ability-overlay.js';
import '../overlay/sc-use-card-ability-overlay.js';

class ScGameOverlay extends connect(localStore)(LitElement) {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScGameStyles}
      <style>
        .overlay {
          display: flex;
          justify-content: center;
          position: fixed;
          top: 0;
          width: 100vw;
          height: calc(100vh - var(${NAV.HEADER.HEIGHT}) - var(${NAV.FOOTER.HEIGHT}));
          background-color: var(${APP_COLORS.OVERLAY_WHITE});
          z-index: 1;
          padding: var(${NAV.HEADER.HEIGHT}) 0 var(${NAV.FOOTER.HEIGHT}) 0;
        }
      </style>
      ${this._getOverlayHtml()}
    `;
  }

  static get properties() { 
    return {
      _isGameMenuOpen: { type: Boolean },
      _selectedCardWithAbility: { type: Object },
      _isCardSelected: { type: Boolean },
      _isAbilitySelected: { type: Boolean },
      _hasWon: { type: Boolean },
      _hasLost: { type: Boolean },
      _isCrafting: { type: Boolean }
    }
  }

  _getOverlayHtml() {
    let overlayInnerHtml = this._getOverlayInnerHtml();
    if (overlayInnerHtml) {
      return html`<div class="overlay">${overlayInnerHtml}</div>`;
    }
    return html``;
  }

  _getOverlayInnerHtml() {
    if (this._isGameMenuOpen) {
      return html`<sc-game-menu-overlay></sc-game-menu-overlay>`;
    }
    if (this._showGameOverOverlay()) {
      return html`
        <sc-game-over-overlay
            .endGameState="${this.hasWon ? END_GAME_STATE.WON : END_GAME_STATE.LOST }"></sc-game-over-overlay>`;
    }
    if (this._showOpponentTurnOverlay()) {
      return html`<sc-opponent-turn-overlay></sc-opponent-turn-overlay>`;
    }
    if (this._showFullPlayerMinionOverlay()) {
      return html`<sc-full-player-minion-overlay></sc-full-player-minion-overlay>`;
    }
    if (this._showFullOpponentMinionOverlay()) {
      return html`<sc-full-opponent-minion-overlay></sc-full-opponent-minion-overlay>`;      
    }
    if (this._showUseCardAbilityOverlay()) {
      return html`
      <sc-use-card-ability-overlay
          .selectedCard="${this._selectedCardWithAbility}"></sc-use-card-ability-overlay>`;
    }
    if (this._showFullHandCardOverlay()) {
      return html`
        <sc-full-hand-card-overlay
            .selectedCard="${this._selectedCardWithAbility}"></sc-full-hand-card-overlay>`;
    }
    if (this._showTargetMinionAbilityOverlay()) {
      return html`<sc-target-minion-ability-overlay></sc-target-minion-ability-overlay>`;
    }
    if (this._showSummonMinionOverlay()) {
      return html`
        <sc-summon-minion-overlay
            .selectedCard="${this._selectedCardWithAbility}"></sc-summon-minion-overlay>`;
    }
    if (this._showPlayMinionOverlay()) {
      return html`<sc-play-minion-overlay></sc-play-minion-overlay>`;
    }
    if (this._showFullCraftingBaseCardOverlay()) {
      return html`<sc-full-crafting-base-card-overlay></sc-full-crafting-base-card-overlay>`;
    }
    return null;
  }

  _showGameOverOverlay() {
    return this._hasLost || this._hasWon;
  }

  _showFullCraftingBaseCardOverlay() {
    return this._isCrafting; // @TODO: && state.crafting.craftingBaseCardSelected
  }

  _showOpponentTurnOverlay() {
    // @TODO: not sure if this is needed yet
    return false;
  }

  _showFullPlayerMinionOverlay() {
    return (
      this._isCardSelected 
      && this._selectedCardWithAbility.source === CARD_SOURCES.SELECT_PLAYER_MINION
    );
  }

  _showFullOpponentMinionOverlay() {
    return (
      this._isCardSelected 
      && this._selectedCardWithAbility.source === CARD_SOURCES.SELECT_OPPONENT_MINION
    );
  }

  _showUseCardAbilityOverlay() {
    return (
      this._isCardSelected
      && !this._isAbilitySelected 
      && this._selectedCardWithAbility.source === CARD_SOURCES.CAST_PLAYER_SPELL
    );
  }

  _showFullHandCardOverlay() {
    return (
      this._isCardSelected 
      && this._selectedCardWithAbility.source === CARD_SOURCES.SELECT_PLAYER_HAND
    );
  }

  _showTargetMinionAbilityOverlay() {
    return (
      this._isCardSelected
      && this._isAbilitySelected 
      && this._selectedCardWithAbility.source === CARD_SOURCES.CAST_PLAYER_SPELL
    );
  }

  _showSummonMinionOverlay() {
    return (
      this._isCardSelected 
      && this._selectedCardWithAbility.source === CARD_SOURCES.SUMMON_PLAYER_MINION
    );
  }

  _showPlayMinionOverlay() {
    return (
      this._isCardSelected 
      && this._selectedCardWithAbility.source === CARD_SOURCES.PLAY_PLAYER_MINION
    );
  }

  stateChanged(state) {
    this._isGameMenuOpen = GameSelector.isGameMenuOpen(state);
    this._hasWon = GameSelector.hasWon(state);
    this._hasLost = GameSelector.hasLost(state);
    this._isCrafting = GameSelector.isCrafting(state);
    this._selectedCardWithAbility = CardsSelector.getSelectedAbility(state);
    this._isCardSelected = !!this._selectedCardWithAbility.card;
    this._isAbilitySelected = !!this._selectedCardWithAbility.ability;
  }
}

window.customElements.define('sc-game-overlay', ScGameOverlay);
