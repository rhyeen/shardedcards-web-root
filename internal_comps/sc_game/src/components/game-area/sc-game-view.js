import { html, LitElement } from '@polymer/lit-element';
import { ScSharedStyles } from '../../../../sc_shared/src/entities/sc-shared-styles.js';
import { ScGameStyles, NAV } from '../../entities/sc_game-styles.js';
import '../../../../sc_cards/src/components/hand/sc-player-hand.js';
import '../../../../sc_cards/src/components/play-area/sc-play-area.js';

export class ScGameView extends LitElement {
  render() {
    return html`
      ${ScSharedStyles}
      ${ScGameStyles}
      <style>
        :host {
          display: flex;
          width: 100vw;
          margin-top: var(${NAV.HEADER.HEIGHT});
          height: calc(100vh - var(${NAV.HEADER.HEIGHT}) - var(${NAV.FOOTER.HEIGHT}));
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }
      </style>
      <sc-play-area></sc-play-area>
      <sc-player-hand></sc-player-hand>
    `
  }

  _openMenu() {
    store.dispatch(showInGameMenu());
  }
}

window.customElements.define('sc-game-view', ScGameView);
