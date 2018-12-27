import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScCardStyles } from '../../entities/sc_card-styles.js';

import './sc-opponent-slot-backlog.js';

class ScOpponentFieldBacklog extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScCardStyles}
      <style>
        :host {
          display: flex;
          flex: 0 0 25px; /* @TODO: get the 25px in some kind of variable.  I have no idea what it is otherwise. Pretty sure it's coming from sc-opponent-slot-backlog.backlog-amount:line-height */
          width: 100%;
        }

        [overlay] {
          display: none;
        }
      </style>
      <div class="field-slot-left" ?overlay="${this.overlay}" field-slot>
        <sc-opponent-slot-backlog .playAreaIndex="${0}"></sc-opponent-slot-backlog>
      </div>
      <div ?overlay="${this.overlay}" field-slot-separator></div>
      <div class="field-slot-middle" ?overlay="${this.overlay}" field-slot>
        <sc-opponent-slot-backlog .playAreaIndex="${1}"></sc-opponent-slot-backlog>
      </div>
      <div ?overlay="${this.overlay}" field-slot-separator></div>
      <div class="field-slot-right" ?overlay="${this.overlay}" field-slot>
        <sc-opponent-slot-backlog .playAreaIndex="${2}"></sc-opponent-slot-backlog>
      </div>
    `;
  }

  static get properties() { 
    return {
      overlay: { type: Boolean }
    }
  }
}

window.customElements.define('sc-opponent-field-backlog', ScOpponentFieldBacklog);