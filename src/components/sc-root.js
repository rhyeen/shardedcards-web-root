import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import store from '../store.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

import { SharedStyles } from '../../internal_comps/sc_shared-styles/shared-styles.js';

import { navigate } from '../state/actions/root.js';

import * as RootSelector from '../state/selectors/root.js';

import { routes } from '../entities/root.js';
import './sc-404.js';

class ScRoot extends connect(store)(LitElement) {
  render() {
    return html`
    ${SharedStyles}
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
      case routes.pages.game:
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
      case routes.pages.game:
        return `${title} | PLAY`;
      case routes.pages.notFound:
        return `${title} | 404 - NOT FOUND`;
      default:
        console.error(`Unexpected page: ${page}`);
        return title;
    }
  }

  stateChanged(state) {
    this._page = RootSelector.getActivePage(state);
  }
}

window.customElements.define('sc-root', ScRoot);
