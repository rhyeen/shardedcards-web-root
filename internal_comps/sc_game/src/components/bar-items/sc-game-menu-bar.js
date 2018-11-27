import { html, LitElement } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScIconsStyles, MenuIcon } from '../../../../sc_shared/src/entities/sc-icons.js';

export class ScGameMenuBarItem extends LitElement {
  render() {
    return html`
    ${ScSharedStyles}
    ${ScIconsStyles}
    <div bar-item>${MenuIcon()}</div>
    `
  }
}

window.customElements.define('sc-game-menu-bar-item', ScGameMenuBarItem);
