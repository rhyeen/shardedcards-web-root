import { html, LitElement } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScGameStyles, NAV } from '../../entities/sc_game-styles.js';
import '../../../../sc_cards/src/components/hand/sc-player-hand.js';
import '../../../../sc_cards/src/components/play-area/sc-play-area.js';
import '../../../../sc_craft/src/components/crafting-area/sc-crafting-area.js';
import '../../../../sc_craft/src/components/crafting-parts/sc-crafting-parts.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';
import * as GameSelector from '../../state/selectors.js';

export class ScGameView extends connect(localStore)(LitElement) {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScGameStyles}
      <style>
        :host {
          display: flex;
          width: 100vw;
          margin-top: var(${NAV.HEADER.HEIGHT});
          height: calc(100vh - var(${NAV.HEADER.HEIGHT}) - var(${NAV.FOOTER.HEIGHT}));
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }
      </style>
      ${this._getGameViewHtml()}
    `
  }

  static get properties() { 
    return {
      _isCrafting: { type: Boolean }
    }
  }

  _getGameViewHtml() {
    if (this._isCrafting) {
      return html`
        <sc-crafting-area></sc-crafting-area>
        <sc-crafting-parts></sc-crafting-parts>
      `;
    } else {
      return html`
        <sc-play-area></sc-play-area>
        <sc-player-hand></sc-player-hand>
      `;
    }
  }

  stateChanged(state) {
    this._isCrafting = GameSelector.isCrafting(state);
  }
}

window.customElements.define('sc-game-view', ScGameView);
