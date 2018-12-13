import * as CardsModel from '../../../../../../sc_cards/src/services/interface/mock/models/model.js';
import { ACTION_TYPES, ACTION_TARGET_TYPES } from '../../../../../../sc_shared/src/entities/turn-keywords.js';
import { CARD_ABILITIES } from '../../../../../../sc_shared/src/entities/card-keywords.js';
import { Log } from '../../../../../../sc_shared/src/services/logger.js';
import * as Cards from '../../../../../../sc_cards/src/services/card-selection.js';
import * as CardActions from '../../../../../../sc_cards/src/services/card-actions.js';
import { CARD_TARGETS } from '../../../../../../sc_cards/src/entities/selected-card.js';
/**
 * Returns true if all the actions are valid for the given turn.
 */
export const executeTurn = (turn) => {
  for (let action of turn) {
    let validAction = _executeAction(action);
    if (!validAction) {
      return false;
    }
  }
  return true;
}

/**
 * @param {*} action of format:
 * {
 *    type: ACTION_TYPES.*, // required
 *    source: {
 *      id: "", // required
 *      instance: "", // required
 *      handIndex: 0, // required if ACTION_TYPES == PLACE_MINION | CAST_SPELL
 *      playAreaIndex: 0, // required if ACTION_TYPES == PLAY_MINION
 *    },
 *    targets: [ // required
 *      {
 *        type: ACTION_TARGET_TYPES.*, // required
 *        playAreaIndex: 0,
 *        abilityId: CARD_ABILITIES.*
 *        id: "", // required
 *        instance: "" // required
 *      }
 *    ]
 * }
 * 
 * Returns true if the action is valid.
 */
export const executeAction = (action) => {
  if (!action.type) {
    Log.error(`No action.type given`);
    return false;
  }
  if (!Cards.getCard(CardsModel.Model.cards, action.id, action.instance)) {
    Log.error(`Unable to retrieve the card ${action.id}::${action.instance}`);
    return false;
  }
  switch(action.type) {
    case ACTION_TYPES.PLAY_MINION:
      return _executeActionPlayMinion(action);
    case ACTION_TYPES.PLACE_MINION:
      return _executeActionSummonMinion(action);
    case ACTION_TYPES.CAST_SPELL:
      return _executeActionCastSpell(action);
    default:
      Log.error(`Unexpected action type: ${action.type}`);
      return false;
  }
}

function _executeActionPlayMinion(action) {
  if (!action.targets.length) {
    Log.error(`No targets specified for playing minion`);
    return false;
  }
  if (_invalidPlayAreaIndex(action.playAreaIndex)) {
    Log.error(`Invalid playAreaIndex: ${action.playAreaIndex}`);
    return false;
  }
  for (let target of action.targets) {
    let validTarget = _executePlayMinionTargetedAction(action, target);
    if (!validTarget) {
      return false;
    }
  }
  return true;
}

function _invalidPlayAreaIndex(playAreaIndex) {
  return _invalidIndex(playAreaIndex) || playAreaIndex < 0 || playAreaIndex > 2;
}

function _invalidIndex(index) {
  return !index && index !== 0;
}

function _executePlayMinionTargetedAction(action, target) {
  if (!target.type) {
    Log.error(`No target.type given`);
    return false;
  }
  if (!Cards.getCard(CardsModel.Model.cards, target.id, target.instance)) {
    Log.error(`Unable to retrieve the card ${target.id}::${target.instance}`);
    return false;
  }
  switch(target.type) {
    case ACTION_TARGET_TYPES.ATTACK:
      return _executeActionAttack(action, target);
    case ACTION_TARGET_TYPES.ABILITY_TARGET_OPPONENT_MINION:
      return _executeAbilityTargetOpponentMinion(action, target);
    case ACTION_TARGET_TYPES.ABILITY_TARGET_PLAYER_MINION:
      return _executeAbilityTargetPlayerMinion(action, target);
    default:
      Log.error(`Unexpected target type: ${target.type} for playing minion`);
      return false;
  }
}

function _executeAbilityTargetOpponentMinion(action, target) {
  if (_invalidPlayAreaIndex(target.playAreaIndex)) {
    Log.error(`Invalid playAreaIndex: ${target.playAreaIndex}`);
    return false;
  }
  if (!target.abilityId) {
    Log.error(`No target.abilityId given`);
    return false;
  }
  switch(target.abilityId) {
    case CARD_ABILITIES.SPELLSHOT:
      return _executeAbility(action, target);
    default:
      Log.error(`Unexpected ability ${target.abilityId} for opponent minion target`);
      return false;
  }
}

function _executeAbilityTargetPlayerMinion(action, target) {
  if (_invalidPlayAreaIndex(target.playAreaIndex)) {
    Log.error(`Invalid playAreaIndex: ${target.playAreaIndex}`);
    return false;
  }
  if (!target.abilityId) {
    Log.error(`No target.abilityId given`);
    return false;
  }
  switch(target.abilityId) {
    case CARD_ABILITIES.REACH:
      return _executeAbility(action, target);
    default:
      Log.error(`Unexpected ability ${target.abilityId} for player minion target`);
      return false;
  }
}

function _executeAbilityTargetPlayer(action, target) {
  if (!target.abilityId) {
    Log.error(`No target.abilityId given`);
    return false;
  }
  switch(target.abilityId) {
    case CARD_ABILITIES.ENERGIZE:
      return _executeAbility(action, target);
    default:
      Log.error(`Unexpected ability ${target.abilityId} for player target`);
      return false;
  }
}

function _invalidHandIndex(handIndex) {
  return _invalidIndex(handIndex) || handIndex < 0 || handIndex > CardsModel.Model.player.hand.refillSize;
}

function _executeActionCastSpell(action) {
  if (!action.targets.length) {
    Log.error(`No targets specified for casting spell`);
    return false;
  }
  if (!Cards.getCard(CardsModel.Model.cards, target.id, target.instance)) {
    Log.error(`Unable to retrieve the card ${target.id}::${target.instance}`);
    return false;
  }
  for (let target of action.targets) {
    let validTarget = _executeCastSpellTargetedAction(action, target);
    if (!validTarget) {
      return false;
    }
  }
  return true;
}

function _executeCastSpellTargetedAction(action, target) {
  if (!target.type) {
    Log.error(`No target.type given`);
    return false;
  }
  switch(target.type) {
    case ACTION_TARGET_TYPES.ABILITY_TARGET_OPPONENT_MINION:
      return _executeAbilityTargetOpponentMinion(action, target);
    case ACTION_TARGET_TYPES.ABILITY_TARGET_PLAYER_MINION:
      return _executeAbilityTargetPlayerMinion(action, target);
    case ACTION_TARGET_TYPES.ABILITY_TARGET_PLAYER:
      return _executeAbilityTargetPlayer(action, target);
    default:
      Log.error(`Unexpected target type: ${target.type} for spell`);
      return false;
  }
}

function _executeActionAttack(action, target) {
  if (_invalidPlayAreaIndex(target.playAreaIndex)) {
    Log.error(`Invalid playAreaIndex: ${target.playAreaIndex}`);
    return false;
  }
  let attackingCard = {
    card: Cards.getCard(CardsModel.Model.cards, action.id, action.instance),
    id: action.id,
    instance: action.instance
  };
  let attackedCard = {
    card: Cards.getCard(CardsModel.Model.cards, target.id, target.instance),
    id: target.id,
    instance: action.instance
  };
  let { updatedCards, attackerDiscarded, attackedDiscarded } = CardActions.attackMinion(CardsModel.Model.cards, attackingCard, attackedCard);
  // @TODO:
  return true;
}

function _executeActionSummonMinion(action) {
  if (_invalidHandIndex(action.handIndex)) {
    Log.error(`Invalid handIndex: ${action.handIndex}`);
    return false;
  }
  if (action.targets.length !== 1) {
    Log.error(`${action.targets.length} targets specified when placing minion`);
    return false;
  }
  let target = action.targets[0];
  if (_invalidPlayAreaIndex(target.playAreaIndex)) {
    Log.error(`Invalid playAreaIndex: ${target.playAreaIndex}`);
    return false;
  }
  let selectedCard = {
    card: Cards.getCard(CardsModel.Model.cards, action.id, action.instance),
    id: action.id,
    instance: action.instance
  };
  let playerFieldCard = {
    card: Cards.getCard(CardsModel.Model.cards, target.id, target.instance),
    id: target.id,
    instance: target.instance,
    playAreaIndex: target.playAreaIndex
  }
  let updatedCards = CardActions.summonMinion(selectedCard, playerFieldCard);
  // @TODO:
  return true;
}

function _executeAbility(action, target) {
  let playAreaIndex = target.playAreaIndex;
  let targets = _getAbilityTargets(target.type);
  if (!targets) {
    return false;
  }
  let card = Cards.getCard(CardsModel.Model.cards, target.id, target.instance);
  let selectedAbility = {
    targets,
    ability: Cards.getAbility(card, target.abilityId),
    abilityId: target.abilityId,
    card,
    id: target.id,
    instance: target.instance
  };
  let playerFieldSlots = _getPlayerFieldSlots();
  let opponentFieldSlots = _getOpponentFieldSlots();
  let { updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots } = CardActions.useCardAbility(playAreaIndex, selectedAbility, playerFieldSlots, opponentFieldSlots);
  // @TODO:
  return true;
}

function _getPlayerFieldSlots() {
  return [
    _getFieldSlot(CardsModel.Model.player.field.slots[0]),
    _getFieldSlot(CardsModel.Model.player.field.slots[1]),
    _getFieldSlot(CardsModel.Model.player.field.slots[2])
  ];
}

function _getOpponentFieldSlots() {
  return [
    _getFieldSlot(CardsModel.Model.opponent.field.slots[0]),
    _getFieldSlot(CardsModel.Model.opponent.field.slots[1]),
    _getFieldSlot(CardsModel.Model.opponent.field.slots[2])
  ];
}

function _getFieldSlot(slot) {
  return {
    id: slot.id,
    instance: slot.instance,
    card: Cards.getCard(CardsModel.Model.cards, slot.id, slot.instance)
  };
}

function _getAbilityTargets(targetType) {
  switch(targetType) {
    case ACTION_TARGET_TYPES.ABILITY_TARGET_OPPONENT_MINION:
      return CARD_TARGETS.OPPONENT_MINION;
    case ACTION_TARGET_TYPES.ABILITY_TARGET_PLAYER_MINION:
      return CARD_TARGETS.PLAYER_MINION;
    case ACTION_TARGET_TYPES.ABILITY_TARGET_PLAYER:
      return CARD_TARGETS.PLAYER;
    default:
      Log.error(`Unexpected target.type: ${targetType}`);
      return null;
  }
}