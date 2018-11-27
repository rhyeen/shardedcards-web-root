import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import store from '../../state/store.js';

import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScIconsStyles, DrawIcon } from '../../../../sc_shared/src/entities/sc-icons.js';

import * as CardsSelector from '../../state/selectors.js';

export class ScDrawPileBarItem extends connect(store)(LitElement) {
  render() {
    return html`
    ${ScSharedStyles}
    ${ScIconsStyles}
    <div bar-item>
      <div class="current">${this._deckSize}</div>
      <div class="icon">${DrawIcon()}</div>
    </div>
    `
  }

  static get properties() { 
    return {
      _deckSize: { type: Number }
    }
  }

  stateChanged(state) {
    this._deckSize = CardsSelector.getDeckSize(state);
  }
}

window.customElements.define('sc-draw-pile-bar-item', ScDrawPileBarItem);
