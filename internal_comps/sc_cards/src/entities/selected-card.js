import { CARD_ABILITIES, CARD_CONDITIONS } from "../../../sc_shared/src/entities/card-keywords";
import { 
  EnergizeIcon,
  HasteIcon,
  SpellshotIcon,
  ReachIcon } from "../../../sc_shared/src/entities/sc-icons";
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

Ability.getName = (abilityId) => {
  switch (abilityId) {
    case CARD_ABILITIES.ENERGIZE:
      return LOCALE_EN.ABILITY.ENERGIZE.NAME;
    case CARD_ABILITIES.HASTE:
      return LOCALE_EN.ABILITY.HASTE.NAME;
    case CARD_ABILITIES.SPELLSHOT:
      return LOCALE_EN.ABILITY.SPELLSHOT.NAME;
    case CARD_ABILITIES.REACH:
      return LOCALE_EN.ABILITY.REACH.NAME;
    default:
      return '';
  }
};

Ability.getDescription = (abilityId, amount) => {
  switch (abilityId) {
    case CARD_ABILITIES.ENERGIZE:
      return LOCALE_EN.ABILITY.ENERGIZE.DESCRIPTION(amount);
    case CARD_ABILITIES.HASTE:
      return LOCALE_EN.ABILITY.HASTE.DESCRIPTION;
    case CARD_ABILITIES.SPELLSHOT:
      return LOCALE_EN.ABILITY.SPELLSHOT.DESCRIPTION(amount);
    case CARD_ABILITIES.REACH:
      return LOCALE_EN.ABILITY.REACH.DESCRIPTION(amount);
    default:
      return '';
  }
};

Ability.getIcon = (abilityId, args) => {
  switch (abilityId) {
    case CARD_ABILITIES.ENERGIZE:
      return EnergizeIcon(args);
    case CARD_ABILITIES.HASTE:
      return HasteIcon(args);
    case CARD_ABILITIES.SPELLSHOT:
      return SpellshotIcon(args);
    case CARD_ABILITIES.REACH:
      return ReachIcon(args);
    default:
      return '';
  }
};

export const Condition = {};

Condition.getName = (condition) => {
  switch (condition) {
    case CARD_CONDITIONS.EXHAUSTED:
      return LOCALE_EN.CONDITION.EXHAUSTED.NAME;
    default:
      return '';
  }
};

Condition.getDescription = (condition) => {
  switch (condition) {
    case CARD_CONDITIONS.EXHAUSTED:
      return LOCALE_EN.CONDITION.EXHAUSTED.DESCRIPTION;
    default:
      return '';
  }
};

Condition.getIcon = (condition, args) => {
  switch (condition) {
    case CARD_CONDITIONS.EXHAUSTED:
      return ExhaustedIcon(args);
    default:
      return '';
  }
};