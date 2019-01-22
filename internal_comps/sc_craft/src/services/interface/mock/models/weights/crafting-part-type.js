import { CRAFTING_PART_TYPES } from "../../../../../entities/crafting-part";

export const CraftingPartTypeWeights = () => [
  {
    type: CRAFTING_PART_TYPES.ABILITY,
    weight: 1
  },
  {
    type: CRAFTING_PART_TYPES.STAT,
    weight: 2
  }
];