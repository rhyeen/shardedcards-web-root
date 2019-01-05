import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScOverlaySharedStyle } from './sc-overlay-shared-style.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';

import { cancelPlaySelectedMinion } from '../../../../sc_cards/src/state/actions.js';

import '../../../../sc_shared/src/components/sc-btn.js';
import '../../../../sc_cards/src/components/selected-card/sc-full-card.js';

import { BTN_TYPES } from '../../../../sc_shared/src/entities/sc-btn-types.js';
import { LOCALE_EN } from '../../../../sc_locale/src/entities/en.js';

export class ScPlayMinionOverlay extends connect(localStore)(LitElement) {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScOverlaySharedStyle}
      <sc-full-card .card="${this.selectedCard.card}"></sc-full-card>
      <div btn-group>
        <sc-btn
            .btntype="${BTN_TYPES.PRESET.BACK}"
            @click="${() => this._cancel()}">
          ${LOCALE_EN.SC_BTN.PRESET.BACK}</sc-btn>
      </div>
    `
  }

  static get properties() { 
    return {
      selectedCard: { type: Object }
    };
  }

  _cancel() {
    localStore.dispatch(cancelPlaySelectedMinion());
  }
}

window.customElements.define('sc-play-minion-overlay', ScPlayMinionOverlay);
