import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import store from '../../state/store.js';

import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScIconsStyles, HealthIcon } from '../../../../sc_shared/src/entities/sc-icons.js';

import * as StatusSelector from '../../state/selectors/sc_status.js';

export class ScHealthBarItem extends connect(store)(LitElement) {
  render() {
    return html`
    ${ScSharedStyles}
    ${ScIconsStyles}
    <div bar-item>
      <div class="current">${this._currentHealth}</div>
      <div class="icon">${HealthIcon()}</div>
    </div>
    `
  }

  static get properties() { 
    return {
      _currentHealth: { type: Number }
    }
  }

  stateChanged(state) {
    this._currentHealth = StatusSelector.getCurrentHealth(state);
  }
}

window.customElements.define('sc-health-bar-item', ScHealthBarItem);
