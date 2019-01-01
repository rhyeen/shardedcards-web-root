import { CARD_ABILITIES, CARD_CONDITIONS } from "../../../sc_shared/src/entities/card-keywords";
import { 
  EnergizeIcon,
  HasteIcon,
  SpellshotIcon,
  ReachIcon,
  ExhaustedIcon } from "../../../sc_shared/src/entities/sc-icons";
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
  iconFn: SpellshotIcon,
  isOpponentMinionTargetedAbility: true
};

abilityMap[CARD_ABILITIES.REACH] = {
  name: LOCALE_EN.ABILITY.REACH.NAME,
  descriptionFn: LOCALE_EN.ABILITY.REACH.DESCRIPTION,
  iconFn: ReachIcon,
  isPlayerMinionTargetedAbility: true
};

Ability.getName = (abilityId) => {
  return abilityMap[abilityId].name;
};

Ability.getDescription = (abilityId, amount) => {
  return abilityMap[abilityId].descriptionFn(amount);
};

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