import { html, LitElement } from '@polymer/lit-element';

import '../../../../sc_cards/src/components/hand/sc-player-hand.js';
import '../../../../sc_cards/src/components/play-area/sc-play-area.js';

export class ScGameView extends LitElement {
  render() {
    return html`
      <sc-play-area></sc-play-area>
      <sc-player-hand></sc-player-hand>
    `
  }

  _openMenu() {
    store.dispatch(showInGameMenu());
  }
}

window.customElements.define('sc-game-view', ScGameView);
