import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles, APP_COLORS } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScGameStyles, NAV } from '../../entities/sc_game-styles.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';

import * as GameSelector from '../../state/selectors.js';

import '../overlay/sc-game-menu-pane.js';

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
      _isGameMenuOpen: { type: Boolean }
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
      return html`<sc-game-menu-pane></sc-game-menu-pane>`;
    }
    return null;
  }

  stateChanged(state) {
    this._isGameMenuOpen = GameSelector.isGameMenuOpen(state);
  }
}

window.customElements.define('sc-game-overlay', ScGameOverlay);
