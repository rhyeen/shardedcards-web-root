import { LitElement, html } from '@polymer/lit-element';

import { Log } from '../../../../../sc_shared/src/services/logger.js';
import { PLAY_FIELD_OWNER } from '../../../entities/play-field-owner.js';
import { store } from 'intrastore/src/store';
import { selectOpponentMinion, selectPlayerMinion } from '../../../state/actions.js';

class ScMinionFieldCard extends LitElement {
  render() {
    return html`
      ${this._getCardHtml()}
    `;
  }

  static get properties() { 
    return {
      fieldSlot: { type: Object },
      owner: { type: String }
    }
  }

  _getCardHtml() {
    if (!this.fieldSlot.card) {
      return html``;
    }
    switch(this.owner) {
      case PLAY_FIELD_OWNER.OPPONENT:
        return this._opponentMinion();
      case PLAY_FIELD_OWNER.PLAYER:
        return this._playerMinion();
      default:
        Log.error(`Unexpected owner: ${this.owner}`);
        return html``;
    }
  }

  _opponentMinion() {
    return html`
      <sc-minion-card
          .card="${this.fieldSlot.card}"
          @click="${this._opponentMinionClicked}"></sc-minion-card>
    `;
  }

  _opponentMinionClicked() {
    store.dispatch(selectOpponentMinion(this.fieldSlot.id, this.fieldSlot.instance, this.fieldSlot.playAreaIndex));
  }

  _playerMinion() {
    return html`
      <sc-minion-card
          .card="${this.fieldSlot.card}"
          @click="${this._playerMinionClicked}"></sc-minion-card>
    `;
  }

  _playerMinionClicked() {
    store.dispatch(selectPlayerMinion(this.fieldSlot.id, this.fieldSlot.instance, this.fieldSlot.playAreaIndex));
  }
}

window.customElements.define('sc-minion-field-card', ScMinionFieldCard);