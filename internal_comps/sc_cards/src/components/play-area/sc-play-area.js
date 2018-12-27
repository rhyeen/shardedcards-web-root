import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCardStyles, PLAY_AREA } from '../../entities/sc_card-styles.js';

import './sc-opponent-field-backlog.js';
import './sc-play-field.js';
import { PLAY_FIELD_OWNER } from '../../entities/play-field-owner.js';

class ScPlayArea extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCardStyles}
      <style>
        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          width: 100%;
          max-width: var(${PLAY_AREA.MAX_WIDTH});
        }

        [play-field-separator] {
          width: 100%;
          border-bottom: var(${PLAY_AREA.SEPARATOR.BORDER});
          border-top: var(${PLAY_AREA.SEPARATOR.BORDER});
          flex: 0 0 calc(var(${PLAY_AREA.SEPARATOR.HEIGHT}) - 2*var(${PLAY_AREA.SEPARATOR.BORDER_SIZE}));
        }

        [play-field-separator][overlay] {
          border: none;
          flex: 0 0 var(${PLAY_AREA.SEPARATOR.HEIGHT});
        }

        /** @NOTE: width/height are set here because we have the context regarding flex **/
        sc-play-field {
          flex: 1;
          width: 100%;
        }
      </style>
      <sc-opponent-field-backlog ?overlay="${this.overlay}"></sc-opponent-field-backlog>
      <sc-play-field .owner="${PLAY_FIELD_OWNER.OPPONENT}" ?overlay="${this.overlay}"></sc-play-field>
      <div ?overlay="${this.overlay}" play-field-separator></div>
      <sc-play-field .owner="${PLAY_FIELD_OWNER.PLAYER}" ?overlay="${this.overlay}"></sc-play-field>
    `;
  }

  static get properties() { 
    return {
      overlay: { type: Boolean }
    }
  }
}

window.customElements.define('sc-play-area', ScPlayArea);