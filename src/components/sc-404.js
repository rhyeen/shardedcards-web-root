import { LitElement, html } from '@polymer/lit-element';
import { ScSharedStyles } from '../../internal_comps/sc_shared/src/entities/sc-shared-styles.js';
import { LOCALE_EN } from '../../internal_comps/sc_locale/src/entities/en.js';

class Sc404 extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      <style>
        :host {
          display: block;
          padding: 40px;
        }
      </style>
      <h1>${LOCALE_EN.SC_ROOT.PAGE_NOT_FOUND.P1}</h1>
      <h2>${LOCALE_EN.SC_ROOT.PAGE_NOT_FOUND.P2}</h2>
    `;
  }
}

window.customElements.define('sc-404', Sc404);
