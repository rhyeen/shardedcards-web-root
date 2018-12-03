import * as Cards from '../services/card-selection.js';
import { CARD_ABILITIES } from '../../../sc_shared/src/entities/card-keywords.js';

export function summonCard(selectedCard, playerFieldCard) {
  let updatedCards = [selectedCard];
  if (playerFieldCard.card) {
    updatedCards.push(playerFieldCard);
    let shield = playerFieldCard.card.health;
    if (playerFieldCard.card.conditions.shield) {
      shield += playerFieldCard.card.conditions.shield;
    }
    if (selectedCard.card.conditions.shield) {
      selectedCard.card.conditions.shield += shield;
    } else {
      selectedCard.card.conditions.shield = shield;
    }
  }
  if (!_hasHaste(selectedCard.card)) {
    selectedCard.card.conditions.exhausted = true;
  }
  selectedCard.card.version += 1;
  return updatedCards;
}

function _hasHaste(card) {
  return !!Cards.getAbility(card, CARD_ABILITIES.HASTE);
}

export function attackCard(cards, attackingCard, attackedCard) {
  let results = {
    updatedCards: [],
    attackerDiscarded: false,
    attackedDiscarded: false
  };
  if (!_attackerCanReach(attackingCard.card, attackedCard.card)) {
    return results;
  }
  _damageCard(attackingCard.card.attack, attackedCard.card);
  _damageCard(attackedCard.card.attack, attackingCard.card);
  attackingCard.card.conditions.exhausted = true;
  results.updatedCards.push(attackingCard);
  results.updatedCards.push(attackedCard);
  results.attackerDiscarded = _prepareCardForDiscard(cards, attackingCard.card, attackingCard.id);
  results.attackedDiscarded = _prepareCardForDiscard(cards, attackedCard.card, attackedCard.id);
  return results;
}

function _attackerCanReach(attackingCard, attackedCard) {
  let distance = Math.abs(attackingCard.playAreaIndex - attackedCard.playAreaIndex);
  if (distance > attackingCard.card.range) {
    console.error(`target is out of reach for attack`);
    return false;
  }
  if (attackingCard.conditions.exhausted) {
    console.error(`attacker is exhausted`);
    return false;
  }
  return true;
}

function _damageCard(damage, card) {
  if (!card.conditions.shield) {
    card.conditions.shield = 0;
  }
  if (card.conditions.shield >= damage) {
    card.conditions.shield -= damage;
  } else {
    card.health -= damage - card.conditions.shield;
    card.conditions.shield = 0;
  }
  card.version += 1;
}

function _prepareCardForDiscard(cards, card, cardId) {
  if (card.health > 0) {
    return false;
  }
  _resetCard(cards, card, cardId);
  return true;
}

function _resetCard(cards, card, cardId) {
  let parentCard = Cards.getParentCard(cards, cardId);
  card.conditions.exhausted = false;
  card.conditions.shield = 0;
  card.version += 1;
  card.health = parentCard.health;
  card.attack = parentCard.attack;
  card.range = parentCard.range;
  card.cost = parentCard.cost;
  if (parentCard.abilities) {
    card.abilities = _deepCopy(parentCard.abilities);
  } else if (card.abilities) {
    delete card.abilities;
  }
}

function _deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function refreshCards(cards) {
  updatedCards = [];
  for (let card of cards) {
    if (_refreshCard(card.card)) {
      updatedCards.push(card);
    }
  }
  return updatedCards;
}

function _refreshCard(card) {
  let cardNeedsRefreshing = false;
  if (card.conditions.exhausted || card.conditions.shield > 0) {
    cardNeedsRefreshing = true;
  }
  card.conditions.exhausted = false;
  card.conditions.shield = 0;
  if (card.abilities) {
    for (let ability of card.abilities) {
      if (ability.used > 0) {
        cardNeedsRefreshing = true;
        ability.used = 0;
      }
    }
  }
  if (cardNeedsRefreshing) {
    card.version += 1;
  }
  return cardNeedsRefreshing;
}

export function useCardAbility(playAreaIndex, selectedAbility, playerFieldSlots, opponentFieldSlots) {
  let results = {
    updatedCards: [],
    addedToDiscardPile: [],
    playerFieldSlots: [...playerFieldSlots],
    opponentFieldSlots: [...opponentFieldSlots]
  };
  if (_abilityUsedOnOpponentUnit(selectedAbility)) {
    let { updatedCards, isFieldCardDiscarded } = _useAbilityOnOpponentUnit(selectedAbility, opponentFieldSlots[playAreaIndex]);
    results.updatedCards = updatedCards;
    if (isFieldCardDiscarded) {
      results.opponentFieldSlots[playAreaIndex] = {
        id: null,
        instance: null
      };
    }
  } else if (_abilityUsedOnPlayerUnit(selectedAbility)) {
    let { updatedCards, isFieldCardDiscarded } = _useAbilityOnPlayerUnit(selectedAbility, playerFieldSlots[playAreaIndex]);
    results.updatedCards = updatedCards;
    if (isFieldCardDiscarded) {
      results.playerFieldSlots[playAreaIndex] = {
        id: null,
        instance: null
      };
    }
  } else {
    console.error(`unexpected ability target: ${selectedAbility.targets}`);
    return results;
  }
  _consumeAbilityUse(selectedAbility);
  return results;
}

function _useAbilityOnOpponentUnit(selectedAbility, opponentFieldSlot) {
  if (!_abilityCanCastOnOpponentUnit(selectedAbility, opponentFieldSlot)) {
    return { updatedCards:[], isFieldCardDiscarded:false };
  }
  return _useAbilityOnVerifiedTargetUnit(selectedAbility, playerFieldSlot);
}

function _abilityCanCastOnOpponentUnit(selectedAbility, opponentFieldSlot) {
  if (!selectedAbility.ability) {
    console.error(`card does not have ability: ${selectedAbility.abilityId}`);
    return false;
  }
  if (!opponentFieldSlot.card) {
    console.error(`cannot cast ability ${selectedAbility.abilityId} on an empty opponent slot`);
    return false;
  }
  if (!_abilityCanTargetOpponent(selectedAbility.abilityId)) {
    console.error(`ability ${selectedAbility.abilityId} cannot target opponent cards`);
    return false;
  }
  return true;
}

function _abilityCanTargetOpponent(abilityId) {
  switch (abilityId) {
    case CARD_ABILITIES.SPELLSHOT:
      return true
    default:
      return false
  }
}

function _useAbilityOnPlayerUnit(selectedAbility, playerFieldSlot) {
  if (!_abilityCanCastOnPlayerUnit(selectedAbility, playerFieldSlot)) {
    return { updatedCards:[], isFieldCardDiscarded:false };
  }
  return _useAbilityOnVerifiedTargetUnit(selectedAbility, playerFieldSlot);
}

function _useAbilityOnVerifiedTargetUnit(selectedAbility, fieldSlot) {
  let results = {
    updatedCards: [],
    isFieldCardDiscarded: false
  };
  let updatedCard;
  switch (selectedAbility.abilityId) {
    case CARD_ABILITIES.SPELLSHOT:
      updatedCard = _useAbilitySpellshot(selectedAbility, fieldSlot);
      break;
    case CARD_ABILITIES.REACH:
      updatedCard = _useAbilityReach(selectedAbility, fieldSlot);
      break;
    default:
      console.error(`unexpected ability ${selectedAbility.abilityId} on targeted card`);
      break;
  }
  if (updatedCard) {
    results.updatedCards.push(updatedCard);
    results.isFieldCardDiscarded = _prepareCardForDiscard(cards, updatedCard.card, updatedCard.id);
  }
  return results;
}

function _useAbilitySpellshot(selectedAbility, fieldSlot) {
  _damageCard(selectedAbility.ability.amount, fieldSlot.card);
  return fieldSlot;
}

function _useAbilityReach(selectedAbility, fieldSlot) {
  _setRangeResults(selectedAbility.ability.amount, fieldSlot.card);
  return fieldSlot;
}

function _setRangeResults(rangeModifier, target) {
  target.range += rangeModifier;
  target.version += 1;
}

function _abilityCanCastOnPlayerUnit(selectedAbility, playerFieldSlot) {
  if (!selectedAbility.ability) {
    console.error(`card does not have ability: ${selectedAbility.abilityId}`);
    return false;
  }
  if (!playerFieldSlot.card) {
    console.error(`cannot cast ability ${selectedAbility.abilityId} on an empty player slot`);
    return false;
  }
  if (!_abilityCanTargetPlayer(selectedAbility.abilityId)) {
    console.error(`ability ${selectedAbility.abilityId} cannot target player cards`);
    return false;
  }
  return true;
}

function _abilityCanTargetPlayer(abilityId) {
  switch (abilityId) {
    case CARD_ABILITIES.REACH:
      return true
    default:
      return false
  }
}

function _consumeAbilityUse(selectedAbility) {
  let ability = Cards.getAbility(selectedAbility.card, selectedAbility.abilityId);
  if (!ability.used) {
    ability.used = 0;
  }
  ability.used += 1;
  selectedAbility.card.version += 1;
}