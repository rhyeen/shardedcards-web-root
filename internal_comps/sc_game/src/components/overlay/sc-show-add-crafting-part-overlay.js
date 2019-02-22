import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScOverlaySharedStyle } from './sc-overlay-shared-style.js';

import { localStore } from '../../state/store.js';

import { cancelSelectCraftingPart } from '../../../../sc_craft/src/state/actions.js';

import '../../../../sc_shared/src/components/sc-btn.js';
import '../../../../sc_craft/src/components/crafting-area/sc-crafting-area.js';

import { BTN_TYPES } from '../../../../sc_shared/src/entities/sc-btn-types.js';
import { LOCALE_EN } from '../../../../sc_locale/src/entities/en.js';

export class ScShowAddCraftingPartOverlay extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScOverlaySharedStyle}
      <sc-crafting-area overlay></sc-crafting-area>
      <div class="btn-group-crafting-parts-area" btn-group>
        <sc-btn
            .btntype="${BTN_TYPES.PRESET.CANCEL}"
            @click="${() => this._cancel()}">
          ${LOCALE_EN.SC_BTN.PRESET.CANCEL}</sc-btn>
      </div>
    `
  }

  _cancel() {
    localStore.dispatch(cancelSelectCraftingPart());
  }
}

window.customElements.define('sc-show-add-crafting-part-overlay', ScShowAddCraftingPartOverlay);
