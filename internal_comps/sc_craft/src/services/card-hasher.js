import { CARD_TYPES, CARD_RARITIES } from "../../../sc_shared/src/entities/card-keywords";
import { Log } from "../../../sc_shared/src/services/logger";

export function getCardHash(card) {
  /*
  [0]: TYPE: M=MINION | S=SPELL
  [1]: RARITY: C=COMMON | R=RARE | E=EPIC | U=UNDEFINED | L=LEGENDARY | S=STANDARD
  [2]: HEALTH: 1-Z
  [3]: ATTACK: 1-Z
  [4]: RANGE: 1-Z
  [5-7]: |A
  [8+]: ABILITIES:
    [X]: ;
    [X+1-X+2]: ABILITY ID: XY
    [X+3]: ABILITY AMOUNT: 1-Z
  */
  if (card.hash) {
    return card.hash;
  }
  let hash = "";
  hash += _getCardHashType(card.type);
  hash += _getCardHashRarity(card.rarity);
  hash += _getCardHashNumber(card.health);
  hash += _getCardHashNumber(card.attack);
  hash += _getCardHashNumber(card.range);
  if (card.abilities && card.abilities.length) {
    hash += "|A";
    for (let ability of card.abilities) {
      hash += _getCardHashAbility(ability);
    }
  }
  return hash;
}

function _getCardHashType(cardType) {
  switch(cardType) {
    case CARD_TYPES.MINION:
      return 'M';
    case CARD_TYPES.SPELL:
      return 'S';
    default:
      Log.error(`unexpected card type: ${cardType}`);
      return '?';
  }
}

function _getCardHashRarity(cardRarity) {
  switch(cardRarity) {
    case CARD_RARITIES.COMMON:
      return 'C';
    case CARD_RARITIES.RARE:
      return 'R';
    case CARD_RARITIES.EPIC:
      return 'E';
    case CARD_RARITIES.LEGENDARY:
      return 'L';
    case CARD_RARITIES.STANDARD:
      return 'S';
    case CARD_RARITIES.UNDEFINED:
      return 'U';
    default:
      Log.error(`unexpected card rarity: ${cardRarity}`);
      return '?';
  }
}

const NEGATIVE_HASH_NUMBERS = '0abcdefghijklmnopqrstuvwxyz-';
const POSITIVE_HASH_NUMBERS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ+';

function _getCardHashNumber(value) {
  if (!value) {
    return '0';
  }
  if (value < 0) {
    value = value * -1;
    if (value >= NEGATIVE_HASH_NUMBERS.length) {
      return NEGATIVE_HASH_NUMBERS[NEGATIVE_HASH_NUMBERS.length - 1];
    }
    return NEGATIVE_HASH_NUMBERS[value];
  }
  if (value >= POSITIVE_HASH_NUMBERS.length) {
    return POSITIVE_HASH_NUMBERS[POSITIVE_HASH_NUMBERS.length - 1];
  }
  return POSITIVE_HASH_NUMBERS[value];
}
