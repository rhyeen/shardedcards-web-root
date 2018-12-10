import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import store from '../state/store.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { Log } from '../../internal_comps/sc_shared/src/services/logger.js';

import { ScSharedStyles } from '../../internal_comps/sc_shared/src/entities/sc-shared-styles.js';

import { navigate } from '../state/actions.js';

import * as RootSelector from '../state/selectors.js';

import { ROUTES } from '../entities/root.js';
import './sc-404.js';

class ScRoot extends connect(store)(LitElement) {
  render() {
    return html`
    ${ScSharedStyles}
    <style>
      :host {
        display: block;
      }
    </style>
    
    ${this._activePageHtml()}
    `;
  }

  static get properties() {
    return {
      _page: { type: String }
    }
  }

  _activePageHtml() {
    switch(this._page) {
      case ROUTES.PAGES.GAME:
        return html`<sc-game></sc-game>`;
      default:
        return html`<sc-404></sc-404>`;
    }
  }

  firstUpdated() {
    installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname))));
  }

  updated(changedProps) {
    if (changedProps.has('_page')) {      
      updateMetadata({
        title: this._getPageTitle(this._page)
      });
    }
  }

  _getPageTitle(page) {
    const title = 'Sharded Cards';
    switch(page) {
      case ROUTES.PAGES.GAME:
        return `${title} | PLAY`;
      case ROUTES.PAGES.NOT_FOUND:
        return `${title} | 404 - NOT FOUND`;
      default:
        Log.error(`Unexpected page: ${page}`);
        return title;
    }
  }

  stateChanged(state) {
    this._page = RootSelector.getActivePage(state);
  }
}

window.customElements.define('sc-root', ScRoot);
