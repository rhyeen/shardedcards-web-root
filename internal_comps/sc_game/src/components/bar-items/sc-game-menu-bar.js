import { html, LitElement } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { sc_iconsStyles, MenuIcon } from '../../../../sc_shared/src/entities/sc-icons.js';

export class ScGameMenuBarItem extends LitElement {
  render() {
    return html`
    ${ScSharedStyles}
    ${sc_iconsStyles}
    <div bar-item>${MenuIcon()}</div>
    `
  }
}

window.customElements.define('sc-game-menu-bar-item', ScGameMenuBarItem);
