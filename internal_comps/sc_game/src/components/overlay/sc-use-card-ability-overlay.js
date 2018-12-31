import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScOverlaySharedStyle } from './sc-overlay-shared-style.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';

import {
  // @TODO: it may be cancelCastSpell instead?
  cancelPlaySelectedSpell,
  selectAbility,
  finishSpellCard
} from '../../../../sc_cards/src/state/actions.js';

import '../../../../sc_shared/src/components/sc-btn.js';
import '../../../../sc_cards/src/components/selected-card/sc-ability-btn.js';

import { BTN_TYPES } from '../../../../sc_shared/src/entities/sc-btn-types.js';
import { LOCALE_EN } from '../../../../sc_locale/src/entities/en.js';


export class ScUseCardAbilityOverlay extends connect(localStore)(LitElement) {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScOverlaySharedStyle}
      <style>
        .btn-group-fill-bottom-up {
          width: 240px; /* @TODO: put into constant */
        }
      </style>
      <div class="btn-group-fill-bottom-up" btn-group>
        ${this._getAbilityBtnsHtml()}  
      </div>
      <div btn-group>
        ${this._getFinalActionBtnHtml()}
      </div>
    `;
  }

  static get properties() { 
    return {
      selectedCard: { type: Object }
    };
  }

  _getAbilityBtnsHtml() {
    return html `${this.selectedCard.abilities.map(ability => this._getAbilityBtnHtml(ability))}`;
  }

  _getAbilityBtnHtml(ability) {
    return html`
      <sc-ability-btn
          .selectedCard="${this.selectedCard}"
          .ability="${ability}"
          @click="${() => this._selectAbility(ability.id)}"></sc-ability-btn>
    `;
  }

  _getFinalActionBtnHtml() {
    if (this._noAbilitiesUsed()) {
      return html`
        <sc-btn
            .btntype="${BTN_TYPES.PRESET.CANCEL}"
            @click="${() => this._cancel()}">
          ${LOCALE_EN.SC_BTN.PRESET.CANCEL}</sc-btn>
      `;
    }
    return html`
      <sc-btn
          .btntype="${BTN_TYPES.PRESET.DONE}"
          @click="${() => this._finish()}">
        ${LOCALE_EN.SC_BTN.PRESET.DONE}</sc-btn>
    `;
  }

  _cancel() {
    localStore.dispatch(cancelPlaySelectedSpell());
  }

  _finish() {
    localStore.dispatch(finishSpellCard());
  }

  _selectAbility(abilityId) {
    localStore.dispatch(selectAbility(abilityId));
  }
}

window.customElements.define('sc-use-card-ability-overlay', ScUseCardAbilityOverlay);
