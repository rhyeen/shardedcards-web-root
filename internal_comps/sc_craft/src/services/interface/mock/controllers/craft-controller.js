import { Model } from '../models/model.js';
import { CARD_ABILITIES, CARD_RARITIES, CARD_TYPES } from '../../../../../../sc_shared/src/entities/card-keywords.js';
import { CRAFTING_PART_TYPES } from '../../../../entities/crafting-part.js';

export const prepareCraftingTurn = () => {
  Model.craftingBaseCard = _getGeneratedCraftingBaseCard();
  Model.craftingParts = _getGeneratedCraftingParts();
};

function _getGeneratedCraftingBaseCard() {
  return {
    type: CARD_TYPES.MINION,
    rarity: CARD_RARITIES.COMMON,
    cost: 1,
    range: 1,
    health: 5,
    attack: 1,
    abilities: [],
    slots: 0
  };
}

function _getGeneratedCraftingParts() {
  return [
    {
      type: CRAFTING_PART_TYPES.ABILITY,
      ability: {
        id: CARD_ABILITIES.SPELLSHOT,
        amount: 1
      }
    },
    {
      type: CRAFTING_PART_TYPES.ABILITY,
      ability: {
        id: CARD_ABILITIES.HASTE
      }
    },
    {
      type: CRAFTING_PART_TYPES.ABILITY,
      ability: {
        id: CARD_ABILITIES.REACH,
        amount: 1
      }
    }
  ];
}