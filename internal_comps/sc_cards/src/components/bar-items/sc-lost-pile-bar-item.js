import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import store from '../../state/store.js';

import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScIconsStyles, LostCardsIcon } from '../../../../sc_shared/src/entities/sc-icons.js';

import * as CardsSelector from '../../state/selectors.js';

export class ScLostPileBarItem extends connect(store)(LitElement) {
  render() {
    return html`
    ${ScSharedStyles}
    ${ScIconsStyles}
    <div bar-item>
      <div class="current">${this._lostPileSize}</div>
      <div class="icon">${LostCardsIcon()}</div>
    </div>
    `
  }

  static get properties() { 
    return {
      _lostPileSize: { type: Number }
    }
  }

  stateChanged(state) {
    this._lostPileSize = CardsSelector.getLostPileSize(state);
  }
}

window.customElements.define('sc-lost-pile-bar-item', ScLostPileBarItem);
