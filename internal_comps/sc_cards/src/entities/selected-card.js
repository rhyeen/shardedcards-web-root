import { CARD_ABILITIES, CARD_CONDITIONS, CARD_STATS } from "../../../sc_shared/src/entities/card-keywords";
import { 
  EnergizeIcon,
  HasteIcon,
  SpellshotIcon,
  ReachIcon,
  ExhaustedIcon, 
  AttackIcon,
  HealthIcon,
  RangeIcon,
  ShieldIcon,
  EnergyIcon} from "../../../sc_shared/src/entities/sc-icons";
import { LOCALE_EN } from "../../../sc_locale/src/entities/en";


export const CARD_SOURCES = {
  SELECT_PLAYER_HAND: 'selectPlayerHand',
  SUMMON_PLAYER_MINION: 'summonPlayerMinion',
  CAST_PLAYER_SPELL: 'castPlayerSpell',
  SELECT_PLAYER_MINION: 'selectPlayerSummon',
  SELECT_OPPONENT_MINION: 'selectOpponentSummon',
  PLAY_PLAYER_MINION: 'playPlayerMinion'
};

export const CARD_TARGETS = {
  PLAYER_MINION: 'playerMinion',
  OPPONENT_MINION: 'opponentMinion',
  PLAYER: 'player'
};

export const Ability = {};
const abilityMap = {};

abilityMap[CARD_ABILITIES.ENERGIZE] = {
  name: LOCALE_EN.ABILITY.ENERGIZE.NAME,
  descriptionFn: LOCALE_EN.ABILITY.ENERGIZE.DESCRIPTION,
  modifiedDescriptionFn: LOCALE_EN.ABILITY.ENERGIZE.MODIFIED_DESCRIPTION,
  iconFn: EnergizeIcon,
  isPlayerTargetedAbility: true
};

abilityMap[CARD_ABILITIES.HASTE] = {
  name: LOCALE_EN.ABILITY.HASTE.NAME,
  descriptionFn: LOCALE_EN.ABILITY.HASTE.DESCRIPTION,
  iconFn: HasteIcon
};

abilityMap[CARD_ABILITIES.SPELLSHOT] = {
  name: LOCALE_EN.ABILITY.SPELLSHOT.NAME,
  descriptionFn: LOCALE_EN.ABILITY.SPELLSHOT.DESCRIPTION,
  modifiedDescriptionFn: LOCALE_EN.ABILITY.SPELLSHOT.MODIFIED_DESCRIPTION,
  iconFn: SpellshotIcon,
  isOpponentMinionTargetedAbility: true
};

abilityMap[CARD_ABILITIES.REACH] = {
  name: LOCALE_EN.ABILITY.REACH.NAME,
  descriptionFn: LOCALE_EN.ABILITY.REACH.DESCRIPTION,
  modifiedDescriptionFn: LOCALE_EN.ABILITY.REACH.MODIFIED_DESCRIPTION,
  iconFn: ReachIcon,
  isPlayerMinionTargetedAbility: true
};

Ability.getName = (abilityId) => {
  return abilityMap[abilityId].name;
};

Ability.getDescription = (abilityId, amount) => {
  return abilityMap[abilityId].descriptionFn(amount);
};

Ability.getModifiedDescription = (abilityId, amount, modifiedAmount) => {
  if (modifiedAmount === amount) {
    return Ability.getDescription(abilityId, amount);
  }
  let modifier = modifiedAmount - amount;
  if (modifier > 0) {
    modifier = '+' + modifier;
  }
  return abilityMap[abilityId].modifiedDescriptionFn(amount, modifier);
}

Ability.getIcon = (abilityId, args) => {
  return abilityMap[abilityId].iconFn(args);
};

Ability.isOpponentMinionTargetedAbility = (abilityId) => {
  return !!abilityMap[abilityId].isOpponentMinionTargetedAbility;
};

Ability.isPlayerMinionTargetedAbility = (abilityId) => {
  return !!abilityMap[abilityId].isPlayerMinionTargetedAbility;
};

Ability.isPlayerTargetedAbility = (abilityId) => {
  return !!abilityMap[abilityId].isPlayerTargetedAbility;
};

export const Condition = {};
const conditionMap = {};
conditionMap[CARD_CONDITIONS.EXHAUSTED] = {
  name: LOCALE_EN.CONDITION.EXHAUSTED.NAME,
  descriptionFn: LOCALE_EN.CONDITION.EXHAUSTED.DESCRIPTION,
  iconFn: ExhaustedIcon
};

Condition.getName = (condition) => {
  return conditionMap[condition].name;
};

Condition.getDescription = (condition) => {
  return conditionMap[condition].descriptionFn();
};

Condition.getIcon = (condition, args) => {
  return conditionMap[condition].iconFn(args);
};

export const CardStat = {};
const cardStatMap = {};

cardStatMap[CARD_STATS.ATTACK] = {
  name: LOCALE_EN.CARD_STAT.ATTACK.NAME,
  descriptionFn: LOCALE_EN.CARD_STAT.ATTACK.DESCRIPTION,
  iconFn: AttackIcon
};

cardStatMap[CARD_STATS.HEALTH] = {
  name: LOCALE_EN.CARD_STAT.HEALTH.NAME,
  descriptionFn: LOCALE_EN.CARD_STAT.HEALTH.DESCRIPTION,
  iconFn: HealthIcon
};

cardStatMap[CARD_STATS.RANGE] = {
  name: LOCALE_EN.CARD_STAT.RANGE.NAME,
  descriptionFn: LOCALE_EN.CARD_STAT.RANGE.DESCRIPTION,
  iconFn: RangeIcon
};

cardStatMap[CARD_STATS.SHIELD] = {
  name: LOCALE_EN.CARD_STAT.SHIELD.NAME,
  descriptionFn: LOCALE_EN.CARD_STAT.SHIELD.DESCRIPTION,
  iconFn: ShieldIcon
};

cardStatMap[CARD_STATS.COST] = {
  name: LOCALE_EN.CARD_STAT.COST.NAME,
  descriptionFn: LOCALE_EN.CARD_STAT.COST.DESCRIPTION,
  iconFn: EnergyIcon
};

CardStat.getName = (statId) => {
  return cardStatMap[statId].name;
};

CardStat.getDescription = (statId, amount) => {
  return cardStatMap[statId].descriptionFn(amount);
};

CardStat.getIcon = (statId, args) => {
  return cardStatMap[statId].iconFn(args);
};