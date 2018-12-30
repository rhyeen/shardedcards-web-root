import { html } from '@polymer/lit-element';
import { ScCardStyles, CARDS } from '../../../entities/sc_card-styles';

export const ScMinionCardOverlayStyle = html`
${ScCardStyles}
<style>
  :host {
    display: flex;
    flex-direction: column;
    width: calc(var(${CARDS.MINION_OVERLAY.WIDTH}) - 2*var(${CARDS.MINION_OVERLAY.PADDING}));
    height: calc(var(${CARDS.MINION_OVERLAY.HEIGHT}) - 2*var(${CARDS.MINION_OVERLAY.PADDING}));
    box-shadow: var(${CARDS.MINION_OVERLAY.ELEVATION});
    border-radius: var(${CARDS.MINION_OVERLAY.BORDER_RADIUS});
    padding: var(${CARDS.MINION_OVERLAY.PADDING});
    border: var(${CARDS.MINION_OVERLAY.BORDER});
    background-color: var(${CARDS.MINION_OVERLAY.BACKGROUND_COLOR});
  }


  [minion-overlay-separator] {
    flex: 0, 0, var(${CARDS.MINION_OVERLAY.BORDER_SIZE});
    border-bottom: var(${CARDS.MINION_OVERLAY.BORDER});
    width: 100%;
  }

  [minion-overlay-top],
  [minion-overlay-bottom] {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>
`;
