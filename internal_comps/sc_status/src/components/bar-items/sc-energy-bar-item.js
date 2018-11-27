import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import store from '../../state/store.js';

import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScIconsStyles, EnergyIcon } from '../../../../sc_shared/src/entities/sc-icons.js';

import * as StatusSelector from '../../state/selectors.js';

export class ScEnergyBarItem extends connect(store)(LitElement) {
  render() {
    return html`
    ${ScSharedStyles}
    ${ScIconsStyles}
    <div bar-item>
      <div class="current">${this._currentEnergy}</div>
      <div class="current-max-divider">/</div>
      <div class="max">${this._maxEnergy}</div>
      <div class="icon">${EnergyIcon()}</div>
    </div>
    `
  }

  static get properties() { 
    return {
      _currentEnergy: { type: Number },
      _maxEnergy: { type: Number }
    }
  }

  stateChanged(state) {
    this._currentEnergy = StatusSelector.getCurrentEnergy(state);
    this._maxEnergy = StatusSelector.getMaxEnergy(state);
  }
}

window.customElements.define('sc-energy-bar-item', ScEnergyBarItem);
