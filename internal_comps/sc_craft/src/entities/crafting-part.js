export const CRAFTING_PART_TYPES = {
  ABILITY: 'ability',
  STAT: 'stat'
};

export const CRAFTING_PART_ABILITY_TIERS = {
  SPELL: {
    TIER_1: 'abilityTierSpell1',
    TIER_2: 'abilityTierSpell2',
    TIER_3: 'abilityTierSpell3'
  },
  MINION: {
    TIER_1: 'abilityTierMinion1',
    TIER_2: 'abilityTierMinion2',
    TIER_3: 'abilityTierMinion3'
  },
  TIER_LEGENDARY: 'abilityTierLegendary',
  TIER_GODLY: 'abilityTierGodly'
};

export function isSpellAbility(abilityTier) {
  return (
    abilityTier.startsWith('abilityTierSpell') 
    || abilityTier === CRAFTING_PART_ABILITY_TIERS.TIER_LEGENDARY
    || abilityTier === CRAFTING_PART_ABILITY_TIERS.TIER_GODLY
  );
}

export function isMinionAbility(abilityTier) {
  return (
    abilityTier.startsWith('abilityTierMinion') 
    || abilityTier === CRAFTING_PART_ABILITY_TIERS.TIER_LEGENDARY
    || abilityTier === CRAFTING_PART_ABILITY_TIERS.TIER_GODLY
  );
}

export function canFitInSlot(abilityTier, slotTier) {
  if (slotTier === CRAFTING_PART_ABILITY_TIERS.TIER_GODLY) {
    return true;
  }
  if (slotTier === CRAFTING_PART_ABILITY_TIERS.TIER_LEGENDARY && abilityTier !== CRAFTING_PART_ABILITY_TIERS.TIER_GODLY) {
    return true;
  }
  if (isMinionAbility(abilityTier) && !isMinionAbility(slotTier)) {
    return false;
  }
  if (isSpellAbility(abilityTier) && !isSpellAbility(slotTier)) {
    return false;
  }
  let abilityTierNumber = _getAbilityTierNumber(abilityTier);
  let slotTierNumber = _getAbilityTierNumber(slotTier);
  return abilityTierNumber <= slotTierNumber;
}

function _getAbilityTierNumber(abilityTier) {
  return parseInt(abilityTier.substring(abilityTier.length - 1));
}