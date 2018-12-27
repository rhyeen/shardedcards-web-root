import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCardStyles } from '../../entities/sc_card-styles.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';

import * as CardsSelector from '../../state/selectors.js';

class ScOpponentSlotBacklog extends connect(localStore)(LitElement) {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCardStyles}
      <style>
        :host {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        [card-banner] {
          --banner-size: 60px;
          position: absolute;
          background-color: #ECEFF1;
          width: var(--banner-size);
          height: var(--banner-size);
          margin-top: -35px; /* @TODO: why 35? I think it's because .backlog-amount:line-height - --banner-size */
          transform: rotate(45deg);
          z-index: -1;
        }

        .backlog-amount {
          margin-top: 3px; /* why 3px? */
          line-height: 25px; /* why 25px? */
          color: #90A4AE;
          text-align: center;
        }
      </style>
      
      <div card-banner></div>
      <div class="backlog-amount">${this._backlogAmount}</div>
    `;
  }

  static get properties() { 
    return {
      playAreaIndex: { type: Number },
      _backlogAmount: { type: Number }
    }
  }

  stateChanged(state) {
    this._backlogAmount = CardsSelector.getOpponentFieldBacklogSizes(state)[this.playAreaIndex];
  }
}

window.customElements.define('sc-opponent-slot-backlog', ScOpponentSlotBacklog);