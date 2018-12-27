import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles, SHADOW_ELEVATIONS } from '../entities/sc-shared-styles.js';
import { Log } from '../../../sc_shared/src/services/logger.js';

import { BTN_TYPES } from '../entities/sc-btn-types.js';

class ScBtn extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      <style>
        :host {
          --sc_shared-dark-btn-text-color: #FFF;
          --sc_shared-light-btn-text-color: #212121;
        }

        button {
          border: none;
          line-height: 40px;
          font-size: 18px;
          text-transform: uppercase;
          border-radius: 4px;
          padding: 0 16px;
          font-weight: 500;
          box-shadow: var(${SHADOW_ELEVATIONS.LEVEL_1.BASE});
        }

        button:hover {
          box-shadow: var(${SHADOW_ELEVATIONS.LEVEL_1.HOVER});
        }

        button:active {
          box-shadow: var(${SHADOW_ELEVATIONS.LEVEL_1.INSET});
        }

        button.btn-warning {
          background-color: #f44336;
          color: var(--sc_shared-dark-btn-text-color);
        }

        button.btn-back {
          background-color: #424242;
          color: var(--sc_shared-dark-btn-text-color);
        }

        button.btn-primary {
          background-color: #2196F3;
          color: var(--sc_shared-dark-btn-text-color);
        }

        button.btn-secondary {
          background-color: #B0BEC5;
          color: var(--sc_shared-dark-btn-text-color);
          padding: 8px 12px;
          line-height: 20px;
          font-size: 16px;
        }

        button[disabled] {
          color: #9E9E9E;
          background-color: #BDBDBD;
          box-shadow: none;
        }

        button[disabled]:hover {
          box-shadow: none;
        }

        button[disabled]:active {
          box-shadow: none;
        }

      </style>

      <button class="${this._getBtnClass()}" ?disabled="${this.disabled}"><slot></slot></button>
    `;
  };
  
  static get properties() { 
    return {
      btntype: { type: String },
      disabled: { type: Boolean }
    };
  };

  _getBtnClass() {
    switch(this.btntype) {
      case BTN_TYPES.GENERIC.PRIMARY:
        return 'btn-primary';
      case BTN_TYPES.GENERIC.SECONDARY:
        return 'btn-secondary';
      case BTN_TYPES.GENERIC.WARNING:
        return 'btn-warning';
      case BTN_TYPES.PRESET.BACK:
        return 'btn-back';
      default:
        Log.error(`Invalid btntype: ${this.btntype}`);
        return 'btn-secondary';
    }
  }
}
window.customElements.define('sc-btn', ScBtn);