import { html, LitElement } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';

import store from '../../state/store.js';

import '../../../../sc_status/src/components/bar-items/sc-energy-bar-item.js';
import '../../../../sc_status/src/components/bar-items/sc-health-bar-item.js';
import '../bar-items/sc-game-menu-bar.js';
import { showInGameMenu } from '../../state/actions.js';
import { ScGameStyles, NAV } from '../../entities/sc_game-styles.js';

export class ScGameHeader extends LitElement {
  render() {
    return html`
    ${ScSharedStyles}
    ${ScGameStyles}
    <style>
      [bar-items] {
        top: 0;
        border-bottom: var(${NAV.HEADER.BORDER});
        height: var(${NAV.HEADER.HEIGHT});
      }

      sc-health-bar-item {
        margin-left: 20px;
      }
    </style>
    <div bar-items>
      <div class="item-group left-items">
        <sc-energy-bar-item></sc-energy-bar-item>
        <sc-health-bar-item></sc-health-bar-item>
      </div>

      <div class="item-group right-items">
        <sc-game-menu-bar-item @click="${() => this._openMenu()}"></sc-game-menu-bar-item>
      </div>
    </div>
    `
  }

  _openMenu() {
    store.dispatch(showInGameMenu());
  }
}

window.customElements.define('sc-game-header', ScGameHeader);
