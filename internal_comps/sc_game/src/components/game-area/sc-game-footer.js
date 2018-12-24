import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScGameStyles, NAV } from '../../entities/sc_game-styles.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';
import { Log } from '../../../../sc_shared/src/services/logger.js';

import { endCrafting, endTurn } from '../../state/actions.js';
import * as GameSelector from '../../state/selectors';
import { BTN_TYPES } from '../../../../sc_shared/src/entities/sc-btn-types.js';
import { LOCALE_EN } from '../../../../sc_locale/src/entities/en.js';

import '../../../../sc_cards/src/components/bar-items/sc-discard-pile-bar-item.js';
import '../../../../sc_cards/src/components/bar-items/sc-draw-pile-bar-item.js';
import '../../../../sc_cards/src/components/bar-items/sc-lost-pile-bar-item.js';

export class ScGameFooter extends connect(localStore)(LitElement) {
  render() {
    return html`
    ${ScSharedStyles}
    ${ScGameStyles}
    <style>
      [bar-items] {
        bottom: 0;
        border-top: var(${NAV.FOOTER.BORDER});
        height: var(${NAV.FOOTER.HEIGHT});
      }

      sc-discard-pile-bar-item,
      sc-lost-pile-bar-item {
        margin-left: 20px;
      }
    </style>
    <div bar-items>
      ${this._getBarItemsHtml()}
    </div>
    `
  }

  static get properties() { 
    return {
      _isPlayingCards: { type: Boolean },
      _isCrafting: { type: Boolean }
    }
  }

  _getBarItemsHtml() {
    if (this._isPlayingCards) {
      return this._getPlayingBarItemsHtml();
    } else if (this._isCrafting) {
      return this._getCraftingBarItemsHtml();
    } else {
      Log.error(`Unexpected game state`);
      return html``;
    }
  }

  _getPlayingBarItemsHtml() {
    return html`
      <div class="item-group left-items">
        <sc-draw-pile-bar-item></sc-draw-pile-bar-item>
        <sc-discard-pile-bar-item></sc-discard-pile-bar-item>
        <sc-lost-pile-bar-item></cc-lost-pile-bar-item>
      </div>
      <div class="item-group right-items">
        <sc-btn
            .btntype="${BTN_TYPES.GENERIC.SECONDARY}"
            @click="${() => this._endTurn()}">
          ${LOCALE_EN.SC_BTN.OTHER.END_TURN}</sc-btn>
      </div>
    `
  }

  _getCraftingBarItemsHtml() {
    return html`
      <div class="item-group left-items"></div>
      <div class="item-group right-items">
        <sc-btn
            .btntype="${BTN_TYPES.GENERIC.SECONDARY}"
            @click="${() => this._endCrafting()}">
          ${LOCALE_EN.SC_BTN.OTHER.FINISH_CRAFTING}</sc-btn>
      </div>
    `
  }

  _endTurn() {
    localStore.dispatch(endTurn.request())
  }

  _endCrafting() {
    localStore.dispatch(endCrafting.request())
  }

  stateChanged(state) {
    this._isCrafting = GameSelector.isCrafting(state);
    this._isPlayingCards = GameSelector.isPlayingCards(state);
  }
}

window.customElements.define('sc-game-footer', ScGameFooter);
