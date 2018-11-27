import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import store from '../../state/store.js';

import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScIconsStyles, DiscardIcon } from '../../../../sc_shared/src/entities/sc-icons.js';

import * as CardsSelector from '../../state/selectors.js';

export class ScDiscardPileBarItem extends connect(store)(LitElement) {
  render() {
    return html`
    ${ScSharedStyles}
    ${ScIconsStyles}
    <div bar-item>
      <div class="current">${this._discardPileSize}</div>
      <div class="icon">${DiscardIcon()}</div>
    </div>
    `
  }

  static get properties() { 
    return {
      _discardPileSize: { type: Number }
    }
  }

  stateChanged(state) {
    this._discardPileSize = CardsSelector.getDiscardPileSize(state);
  }
}

window.customElements.define('sc-discard-pile-bar-item', ScDiscardPileBarItem);
