import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../entities/sc-shared-styles.js';
import { Log } from '../../../sc_shared/src/services/logger.js';
import { BTN_TYPES } from '../entities/sc-btn-types.js';
import { ScBtnBaseStyle, BTN_COLORS } from './sc-btn-base-style.js';

class ScBtn extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScBtnBaseStyle}
      <style>
        button.btn-endturn {
          padding: 8px 12px;
          line-height: 20px;
          font-size: 16px;
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
      case BTN_TYPES.GENERIC.BACK:
        return 'btn-back';
      case BTN_TYPES.PRESET.BACK:
        return 'btn-back';
      case BTN_TYPES.PRESET.CANCEL:
        return 'btn-warning btn-cancel';
      case BTN_TYPES.PRESET.END_TURN:
        return 'btn-secondary btn-endturn';
      case BTN_TYPES.PRESET.DONE:
        return 'btn-primary btn-done';
      default:
        Log.error(`invalid btntype: ${this.btntype}`);
        return 'btn-secondary';
    }
  }
}
window.customElements.define('sc-btn', ScBtn);