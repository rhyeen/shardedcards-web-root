import * as Cards from '../services/card-selection.js';
import { CARD_ABILITIES } from '../../../sc_shared/src/entities/card-keywords.js';
import { Log } from '../../../sc_shared/src/services/logger.js';
import { CARD_TARGETS } from '../entities/selected-card.js';

export function canAttackPlayer(selectedCard, playerFieldSlots, cards) {
  let indices = indicesInAttackRange(selectedCard);
  for (let i of indices) {
    if (!_minionOnPlayAreaIndex(playerFieldSlots, i)) {
      return true;
    }
  }
  return false;
}

export function indicesInAttackRange(selectedCard) {
  let inRangeFieldIndices = [];
  if (indexInAttackRange(selectedCard, 0)) {
    inRangeFieldIndices.push(0);
  }
  if (indexInAttackRange(selectedCard, 1)) {
    inRangeFieldIndices.push(1);
  }
  if (indexInAttackRange(selectedCard, 2)) {
    inRangeFieldIndices.push(2);
  }
  return inRangeFieldIndices;
}

export function indexInAttackRange(selectedCard, playAreaIndex) {
  if (!selectedCard.card || (selectedCard.card.conditions && selectedCard.card.conditions.exhausted)) {
    return false;
  }
  if (!_validPlayAreaIndex(selectedCard.playAreaIndex)) {
    return false;
  }
  if (!_validPlayAreaIndex(playAreaIndex)) {
    return false;
  }
  if (!(selectedCard.card.range > 0)) {
    return false;
  }
  return _indexWithinRange(selectedCard.card.range, selectedCard.playAreaIndex, playAreaIndex);
}

function _validPlayAreaIndex(playAreaIndex) {
  return playAreaIndex <= 2 && playAreaIndex >= 0;
}

function _indexWithinRange(range, playAreaIndex, targetFieldIndex) {
  return Math.abs(targetFieldIndex - playAreaIndex) < range;
}

function _minionOnPlayAreaIndex(fieldSlots, playAreaIndex) {
  return !!fieldSlots[playAreaIndex].id;
}

export function summonMinion(selectedCard, playerFieldCard) {
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
  if (!Cards.hasHaste(selectedCard.card)) {
    selectedCard.card.conditions.exhausted = true;
  }
  selectedCard.card.version += 1;
  return updatedCards;
}

export function attackMinion(cards, attackingCard, attackedCard) {
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
    Log.error(`target is out of reach for attack`);
    return false;
  }
  if (attackingCard.conditions.exhausted) {
    Log.error(`attacker is exhausted`);
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
  if (card.health < 0) {
    card.health = 0;
  }
  card.version += 1;
}

function _prepareCardForDiscard(cards, card, cardId) {
  if (Cards.isDead(card)) {
    return false;
  }
  _resetCard(cards, card, cardId);
  return true;
}

/** @MUTATES: cards */
export function resetCards(cards, cardInstances) {
  for (let cardInstance of cardInstances) {
    let card = Cards.getCard(cards, cardInstance.id, cardInstance.instance);
    _resetCard(cards, card, cardInstance.id);
  }
}

function _resetCard(cards, card, cardId) {
  let parentCard = Cards.getParentCard(cards, cardId);
  if (!card.conditions) {
    card.conditions = {};
  }
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

export function refreshCards(cardContexts) {
  let updatedCards = [];
  for (let cardContext of cardContexts) {
    if (!cardContext.id) {
      continue;
    }
    if (_refreshCard(cardContext.card)) {
      updatedCards.push(cardContext);
    }
  }
  return updatedCards;
}

function _refreshCard(card) {
  let cardNeedsRefreshing = false;
  if (!card.conditions) {
    card.conditions = {};
  }
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

export function useCardAbility(cards, playAreaIndex, selectedAbility, playerFieldSlots, opponentFieldSlots) {
  let results = {
    updatedCards: [],
    addedToDiscardPile: [],
    playerFieldSlots: [...playerFieldSlots],
    opponentFieldSlots: [...opponentFieldSlots],
    statusUpdates: {}
  };
  if (_abilityUsedOnOpponentMinion(selectedAbility)) {
    let { updatedCards, isFieldCardDiscarded } = _useAbilityOnOpponentMinion(selectedAbility, opponentFieldSlots[playAreaIndex]);
    results.updatedCards = updatedCards;
    if (isFieldCardDiscarded) {
      results.opponentFieldSlots[playAreaIndex] = {
        id: null,
        instance: null
      };
    }
  } else if (_abilityUsedOnPlayerMinion(selectedAbility)) {
    let { updatedCards, isFieldCardDiscarded } = _useAbilityOnPlayerMinion(cards, selectedAbility, playerFieldSlots[playAreaIndex]);
    results.updatedCards = updatedCards;
    if (isFieldCardDiscarded) {
      results.playerFieldSlots[playAreaIndex] = {
        id: null,
        instance: null
      };
    }
  } else if (_abilityUsedOnPlayer(selectedAbility)) {
    let { updatedCards, statusUpdates } = _useAbilityOnPlayer(selectedAbility);
    results.updatedCards = updatedCards;
    results.statusUpdates = statusUpdates;
    // @TODO: need to figure out how to appropriately return stuff like player status updates...
    console.trace('@TODO');
  } else {
    Log.error(`unexpected ability target: ${selectedAbility.targets}`);
    return results;
  }
  _consumeAbilityUse(selectedAbility);
  return results;
}

function _abilityUsedOnOpponentMinion(selectedAbility) {
  return selectedAbility.targets === CARD_TARGETS.OPPONENT_MINION;
}

function _abilityUsedOnPlayerMinion(selectedAbility) {
  return selectedAbility.targets === CARD_TARGETS.PLAYER_MINION;  
}

function _abilityUsedOnPlayer(selectedAbility) {
  return selectedAbility.targets === CARD_TARGETS.PLAYER;  
}

function _useAbilityOnOpponentMinion(selectedAbility, opponentFieldSlot) {
  if (!_abilityCanCastOnOpponentMinion(selectedAbility, opponentFieldSlot)) {
    return { updatedCards:[], isFieldCardDiscarded:false };
  }
  return _useAbilityOnVerifiedTargetMinion(selectedAbility, playerFieldSlot);
}

function _abilityCanCastOnOpponentMinion(selectedAbility, opponentFieldSlot) {
  if (!selectedAbility.ability) {
    Log.error(`card does not have ability: ${selectedAbility.abilityId}`);
    return false;
  }
  if (!opponentFieldSlot.card) {
    Log.error(`cannot cast ability ${selectedAbility.abilityId} on an empty opponent slot`);
    return false;
  }
  if (!_abilityCanTargetOpponent(selectedAbility.abilityId)) {
    Log.error(`ability ${selectedAbility.abilityId} cannot target opponent cards`);
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

function _useAbilityOnPlayerMinion(cards, selectedAbility, playerFieldSlot) {
  if (!_abilityCanCastOnPlayerMinion(selectedAbility, playerFieldSlot)) {
    return { updatedCards:[], isFieldCardDiscarded:false };
  }
  return _useAbilityOnVerifiedTargetMinion(cards, selectedAbility, playerFieldSlot);
}

function _useAbilityOnVerifiedTargetMinion(cards, selectedAbility, fieldSlot) {
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
      Log.error(`unexpected ability ${selectedAbility.abilityId} on targeted card`);
      break;
  }
  if (updatedCard) {
    results.updatedCards.push(updatedCard);
    results.isFieldCardDiscarded = _prepareCardForDiscard(cards, updatedCard.card, updatedCard.id);
  }
  return results;
}

function _useAbilityOnPlayer(selectedAbility) {
  if (!_abilityCanCastOnPlayer(selectedAbility)) {
    return { updatedCards: [], statusUpdates: {}};
  }
  return _useAbilityOnVerifiedPlayer(selectedAbility);
}

function _useAbilityOnVerifiedPlayer(selectedAbility) {
  let results = {
    updatedCards: [],
    statusUpdates: {}
  }
  switch (selectedAbility.abilityId) {
    case CARD_ABILITIES.ENERGIZE:
      results.statusUpdates = _useAbilityEnergize(selectedAbility);
      break;
    default:
      Log.error(`unexpected ability ${selectedAbility.abilityId} on targeted player`);
      break;
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

function _useAbilityEnergize(selectedAbility) {
  return {
    player: {
      energy: {
        maxModifier: selectedAbility.ability.amount,
        currentModifier: selectedAbility.ability.amount
      }
    }
  };
}

function _abilityCanCastOnPlayerMinion(selectedAbility, playerFieldSlot) {
  if (!selectedAbility.ability) {
    Log.error(`card does not have ability: ${selectedAbility.abilityId}`);
    return false;
  }
  if (!playerFieldSlot.card) {
    Log.error(`cannot cast ability ${selectedAbility.abilityId} on an empty player slot`);
    return false;
  }
  if (!_abilityCanTargetPlayerMinion(selectedAbility.abilityId)) {
    Log.error(`ability ${selectedAbility.abilityId} cannot target player cards`);
    return false;
  }
  return true;
}

function _abilityCanCastOnPlayer(selectedAbility) {
  if (!selectedAbility.ability) {
    Log.error(`card does not have ability: ${selectedAbility.abilityId}`);
    return false;
  }
  if (!_abilityCanTargetPlayer(selectedAbility.abilityId)) {
    Log.error(`ability ${selectedAbility.abilityId} cannot target player`);
    return false;
  }
  return true;
}

function _abilityCanTargetPlayerMinion(abilityId) {
  switch (abilityId) {
    case CARD_ABILITIES.REACH:
      return true;
    default:
      return false;
  }
}

function _abilityCanTargetPlayer(abilityId) {
  switch (abilityId) {
    case CARD_ABILITIES.ENERGIZE:
      return true;
    default:
      return false;
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