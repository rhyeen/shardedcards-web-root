import * as CardsModel from '../../../../../../sc_cards/src/services/interface/mock/models/model.js';
import * as StatusModel from '../../../../../../sc_status/src/services/interface/mock/models/model.js';
import * as GameModel from '../models/model.js';
import { Log } from '../../../../../../sc_shared/src/services/logger.js';
import * as Cards from '../../../../../../sc_cards/src/services/card-selection.js';
import * as CardActions from '../../../../../../sc_cards/src/services/card-actions.js';
import { ACTION_TYPES, ACTION_TARGET_TYPES } from '../../../../../../sc_shared/src/entities/turn-keywords.js';

const MAX_CARD_ACTIONS = 10;

export const fulfillOpponentTurn = () => {
  let fieldPlayOrder = _getOpponentMinionPlayOrder();
  let turn = [];
  let turnUpdatedCards = [];
  for (let fieldPlayCard of fieldPlayOrder) {
    let { actions, updatedCards } = _getFieldMinionActions(fieldPlayCard);
    turn.push(...actions);
    turnUpdatedCards.push(...updatedCards);
  }
  turnUpdatedCards = _prepareUpdatedCards(turnUpdatedCards);
  GameModel.recordOpponentTurn(turn, turnUpdatedCards);
}

function _prepareUpdatedCards(updatedCards) {
  let updatedCardsSet = [];
  for (let updatedCard of updatedCards) {
    if (!_cardInSet(updatedCardsSet, updatedCard)) {
      updatedCardsSet.push({
        id: updatedCard.id,
        instance: updatedCard.instance,
        card: updatedCard.card
      });
    }
  }
  return updatedCardsSet;
}

function _cardInSet(cardSet, cardContext) {
  for (let cardSetItem of cardSet) {
    if (cardSetItem.id === cardContext.id && cardSetItem.instance === cardContext.instance) {
      return true;
    }
  }
  return false;
}

function _getOpponentMinionPlayOrder() {
  // @TODO: check if card is "aggressive" or "cautious".  An aggressive card tries to go first
  // a cautious card tries to go last.
  return _getMinionIndicesOnField();
}

function _getMinionIndicesOnField() {
  let minionCard = [];
  if (_opponentMinionOnFieldIndex(0)) {
    minionCard.push(_getOpponentMinionCardContext(0));
  }
  if (_opponentMinionOnFieldIndex(1)) {
    minionCard.push(_getOpponentMinionCardContext(1));
  }
  if (_opponentMinionOnFieldIndex(2)) {
    minionCard.push(_getOpponentMinionCardContext(2));
  }
  return minionCard;
}

function _opponentMinionOnFieldIndex(playAreaIndex) {
  return !!CardsModel.Model.opponent.field.slots[playAreaIndex].id;
}

function _playerMinionOnFieldIndex(playAreaIndex) {
  return !!CardsModel.Model.player.field.slots[playAreaIndex].id;
}

function _getOpponentMinionCardContext(playAreaIndex) {
  let id = CardsModel.Model.opponent.field.slots[playAreaIndex].id;
  let instance = CardsModel.Model.opponent.field.slots[playAreaIndex].instance;
  return {
    playAreaIndex: playAreaIndex,
    card: Cards.getCard(CardsModel.Model.cards, id, instance),
    id,
    instance
  };
}

function _getPlayerMinionCardContext(playAreaIndex) {
  let id = CardsModel.Model.player.field.slots[playAreaIndex].id;
  let instance = CardsModel.Model.player.field.slots[playAreaIndex].instance;
  return {
    playAreaIndex: playAreaIndex,
    card: Cards.getCard(CardsModel.Model.cards, id, instance),
    id,
    instance
  };
}

function _getFieldMinionActions(minionCard) {
  let actions = [];
  let actionsUpdatedCards = [];
  let iterations = 0;
  while (true) {
    if (iterations > MAX_CARD_ACTIONS) {
      Log.error('max iterations met');
      break;
    }
    iterations++;
    if (Cards.isExhausted(minionCard.card) || Cards.isDead(minionCard.card)) {
      break;
    }
    if (CardActions.canAttackPlayer(minionCard, CardsModel.Model.player.field.slots)) {
      let { action, updatedMinionCard } = _attackPlayer(minionCard);
      minionCard = updatedMinionCard;
      actionsUpdatedCards.push(updatedMinionCard);
      actions.push(action);
      continue;
    }
    let possibleTargetIndices = _targetsInRange(minionCard);
    if (!possibleTargetIndices.length) {
      break;
    }
    // we intentionally don't just attack the target if there is only a single possible target since we should ignore the
    // target if we can deal it no damage.
    possibleTargetIndices = _targetsThatCanBeDealtMaxDamage(minionCard, possibleTargetIndices);
    if (!possibleTargetIndices.length) {
      // this would be if all targets have enough shield to avoid the attack, in which case, the enemy does not attack.
      break;
    }
    if (possibleTargetIndices.length === 1) {
      minionCard = _handleAttackTarget(minionCard, possibleTargetIndices[0], actions, actionsUpdatedCards);
      continue;
    }
    let previousPossibleTargets = [...possibleTargetIndices];
    possibleTargetIndices = _targetsThatCanBeKilled(minionCard, possibleTargetIndices);
    if (!possibleTargetIndices.length) {
      minionCard = _handleAttackRandomTarget(minionCard, previousPossibleTargets, actions, actionsUpdatedCards);
      continue;
    }
    if (possibleTargetIndices.length === 1) {
      minionCard = _handleAttackTarget(minionCard, possibleTargetIndices[0], actions, actionsUpdatedCards);
      continue;
    }
    minionCard = _handleAttackRandomTarget(minionCard, possibleTargetIndices, actions, actionsUpdatedCards);
  }
  return { actions, updatedCards: actionsUpdatedCards };
}

function _handleAttackRandomTarget(minionCard, possibleTargetIndices, actions, actionsUpdatedCards) {
  let { action, updatedCards, updatedMinionCard } = _attackRandomTarget(minionCard, possibleTargetIndices);
  actions.push(action);
  actionsUpdatedCards.push(...updatedCards);
  return updatedMinionCard;
}

function _handleAttackTarget(minionCard, targetAreaIndex, actions, actionsUpdatedCards) {
  let { action, updatedCards, updatedMinionCard } = _attackTarget(minionCard, targetAreaIndex);
  actions.push(action);
  actionsUpdatedCards.push(...updatedCards);
  return updatedMinionCard;
}

function _targetsInRange(minionCard) {
  let indicesInRange = CardActions.indicesInAttackRange(minionCard);
  let possibleTargets = [];
  for (let playAreaIndex of indicesInRange) {
    if (_playerMinionOnFieldIndex(playAreaIndex)) {
      possibleTargets.push(playAreaIndex);
    }
  }
  return possibleTargets;
}

function _attackPlayer(minionCard) {
  let { currentPlayerHealth, updatedAttackerCard } = CardActions.attackPlayer(minionCard, StatusModel.Model.player);
  StatusModel.Model.player.health.current = currentPlayerHealth;
  Cards.setCard(CardsModel.Model.cards, updatedAttackerCard);
  let action = {
    type: ACTION_TYPES.PLAY_MINION,
    source: {
      id: minionCard.id,
      instance: minionCard.instance,
      playAreaIndex: minionCard.playAreaIndex
    },
    targets: [
      {
        type: ACTION_TARGET_TYPES.ATTACK_PLAYER
      }
    ]
  };
  return {
    updatedMinionCard: updatedAttackerCard,
    action
  };
}

function _targetsThatCanBeDealtMaxDamage(minionCard, possibleTargetIndices) {
  let maxDamage = 1;
  let possibleMaxDamageTargetIndices = [];
  for (let targetAreaIndex of possibleTargetIndices) {
    let damageDealt = _healthLostFromAttack(minionCard, targetAreaIndex);
    if (damageDealt > maxDamage) {
      possibleMaxDamageTargetIndices = [];
      maxDamage = damageDealt;
    }
    if (damageDealt === maxDamage) {
      possibleMaxDamageTargetIndices.push(targetAreaIndex);
    }
  }
  return possibleMaxDamageTargetIndices;
}

function _healthLostFromAttack(minionCard, targetAreaIndex) {
  let playerCard = _getPlayerMinionCardContext(targetAreaIndex);
  let { updatedCards, attackedDiscarded } = CardActions.attackMinion(CardsModel.Model.cards, minionCard, playerCard);
  if (attackedDiscarded) {
    return playerCard.card.health;
  }
  let updatedPlayerCard = Cards.getUpdatedCard(playerCard, updatedCards);
  return playerCard.card.health - updatedPlayerCard.card.health;
}

function _attackTarget(minionCard, targetAreaIndex) {
  let playerCard = _getPlayerMinionCardContext(targetAreaIndex);
  let { updatedCards, attackedDiscarded, attackerDiscarded } = CardActions.attackMinion(CardsModel.Model.cards, minionCard, playerCard);
  Cards.setCards(CardsModel.Model.cards, updatedCards);
  let updatedMinionCard = Cards.getUpdatedCard(minionCard, updatedCards);
  if (attackedDiscarded) {
    CardsModel.Model.player.discardPile.cards.push({
      id: playerCard.id,
      instance: playerCard.instance
    });
    CardsModel.Model.player.field.slots[targetAreaIndex] = {
      id: null,
      instance: null
    };
  }
  if (attackerDiscarded) {
    CardsModel.Model.opponent.field.slots[minionCard.playAreaIndex] = {
      id: null,
      instance: null
    };
  }
  let action = {
    type: ACTION_TYPES.PLAY_MINION,
    source: {
      id: minionCard.id,
      instance: minionCard.instance,
      playAreaIndex: minionCard.playAreaIndex
    },
    targets: [
      {
        type: ACTION_TARGET_TYPES.ATTACK_MINION,
        playAreaIndex: playerCard.playAreaIndex,
        id: playerCard.id,
        instance: playerCard.instance
      }
    ]
  };
  return {
    action,
    updatedCards,
    updatedMinionCard
  }
}

function _attackRandomTarget(minionCard, targetAreaIndices) {
  return _attackTarget(minionCard, _getRandomItemFromArray(targetAreaIndices))
}

function _getRandomItemFromArray(arr) {
  return arr[Math.floor(Math.random()*arr.length)]
}

function _targetsThatCanBeKilled(minionCard, possibleTargetIndices) {
  const possibleKilledTargetIndices = [];
  for (let targetAreaIndex of possibleTargetIndices) {
    if (_killedFromAttack(minionCard, targetAreaIndex)) {
      possibleKilledTargetIndices.push(targetAreaIndex);
    }
  }
  return possibleKilledTargetIndices;
}

function _killedFromAttack(minionCard, targetAreaIndex) {
  let playerCard = _getPlayerMinionCardContext(targetAreaIndex);
  let { attackedDiscarded } = CardActions.attackMinion(CardsModel.Model.cards, minionCard, playerCard);
  return attackedDiscarded;
}
