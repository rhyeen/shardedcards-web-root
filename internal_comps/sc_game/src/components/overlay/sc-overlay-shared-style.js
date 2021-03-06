import { html } from '@polymer/lit-element';
import { AREAS, ScCardStyles } from '../../../../sc_cards/src/entities/sc_card-styles';
import { CRAFTING_PARTS, ScCraftingStyles } from '../../../../sc_craft/src/entities/sc_crafting-styles';

export const ScOverlaySharedStyle = html`
${ScCardStyles}
${ScCraftingStyles}
<style>
  :host {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  [btn-group] {
    margin: 20px 0 40px 0;
  }

  [btn-group] sc-btn:first-child {
    margin-left: 0;
  }

  [btn-group] sc-btn {
    margin-left: 20px;
  }

  [btn-group].btn-group-tight sc-btn {
    margin-left: 5px;
  }

  [btn-group].btn-group-fill-bottom-up {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: center;
    height: 100%;
    margin: 0;
  }

  /** if the btn-group needs to properly fill the  player hand height **/
  [btn-group].btn-group-hand-area,
  [btn-group].btn-group-crafting-parts-area {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 0;
  }

  [btn-group].btn-group-hand-area {
    flex: 0 0 var(${AREAS.PLAYER_HAND.HEIGHT});
  }

  [btn-group].btn-group-crafting-parts-area {
    flex: 0 0 var(${CRAFTING_PARTS.HEIGHT});
  }

  sc-btn:first-child {
    margin-top: 0;
  }

  sc-btn {
    margin-top: 20px;
  }
</style>
`;
