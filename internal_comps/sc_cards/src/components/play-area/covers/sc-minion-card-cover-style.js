import { html } from '@polymer/lit-element';
import { ScCardStyles, CARDS } from '../../../entities/sc_card-styles';

export const ScMinionCardCoverStyle = html`
${ScCardStyles}
<style>
  :host {
    display: flex;
    flex-direction: column;
    width: calc(var(${CARDS.MINION_COVER.WIDTH}) - 2*var(${CARDS.MINION_COVER.PADDING}));
    height: calc(var(${CARDS.MINION_COVER.HEIGHT}) - 2*var(${CARDS.MINION_COVER.PADDING}));
    box-shadow: var(${CARDS.MINION_COVER.ELEVATION});
    border-radius: var(${CARDS.MINION_COVER.BORDER_RADIUS});
    padding: var(${CARDS.MINION_COVER.PADDING});
    background-color: var(${CARDS.MINION_COVER.BACKGROUND_COLOR});
  }


  [minion-cover-separator] {
    flex: 0, 0, var(${CARDS.MINION_COVER.BORDER_SIZE});
    width: 100%;
  }

  [minion-cover-top],
  [minion-cover-bottom] {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>
`;
