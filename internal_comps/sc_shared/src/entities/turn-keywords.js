export const ACTION_TYPES = {
  PLAY_MINION: 'playMinion',
  CAST_SPELL: 'castSpell',
  SUMMON_MINION: 'placeMinion',
  CRAFT_BASE_CARD: 'craftBaseCard',
  ADD_CRAFTED_CARD_TO_DECK: 'addCraftedCardToDeck',
  ADD_CRAFTING_PART: 'addCraftingPart'
};

export const ACTION_TARGET_TYPES = {
  SUMMON_MINION: 'placeMinion',
  ABILITY_TARGET_OPPONENT_MINION: 'abilityTargetOpponentMinion',
  ABILITY_TARGET_PLAYER_MINION: 'abilityTargetPlayerMinion',
  ATTACK_MINION: 'attackMinion',
  ATTACK_PLAYER: 'attackPlayer',
  ABILITY_TARGET_PLAYER: 'abilityTargetPlayer'
};