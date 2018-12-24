import * as CardsModel from '../../../../../../sc_cards/src/services/interface/mock/models/model.js';
import * as StatusModel from '../../../../../../sc_status/src/services/interface/mock/models/model.js';
import * as GameModel from '../models/model.js';
import { Log } from '../../../../../../sc_shared/src/services/logger.js';
import { Cards } from '../../../../../../sc_cards/src/services/card-selection.js';
import * as CardActions from '../../../../../../sc_cards/src/services/card-actions.js';
import { ACTION_TYPES, ACTION_TARGET_TYPES } from '../../../../../../sc_shared/src/entities/turn-keywords.js';

const MAX_LOOP_ITERATIONS = 10;

export const executeOpponentTurn = () => {
  let fieldPlayOrder = _getOpponentMinionPlayOrder();
  let turn = [];
  for (let fieldPlayCard of fieldPlayOrder) {
    let cardActions = _getFieldMinionActions(fieldPlayCard);
    turn.push(...cardActions);
  }
  GameModel.recordOpponentTurn(turn);
}

function _getOpponentMinionPlayOrder() {
  // @TODO: check if card is "aggressive" or "cautious".  An aggressive card tries to go first
  // a cautious card tries to go last.
  return _getMinionIndicesOnField();
}

function _getMinionIndicesOnField() {
  let minionCard = [];
  if (_minionOnFieldIndex(0)) {
    minionCard.push(_getOpponentMinionCardContext(0));
  }
  if (_minionOnFieldIndex(1)) {
    minionCard.push(_getOpponentMinionCardContext(1));
  }
  if (_minionOnFieldIndex(2)) {
    minionCard.push(_getOpponentMinionCardContext(2));
  }
  return minionCard;
}

function _minionOnFieldIndex(playAreaIndex) {
  return !!CardsModel.Model.opponent.field.slots[playAreaIndex].id;
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
  let iterations = 0;
  while (true) {
    if (iterations > MAX_LOOP_ITERATIONS) {
      Log.error('Max iterations met');
      break;
    }
    iterations++;
    if (Cards.isExhausted(minionCard.card) || Cards.isDead(minionCard.card)) {
      break;
    }
    if (CardActions.canAttackPlayer(minionCard, CardsModel.Model.opponent.field.slots, CardsModel.Model.cards)) {
      let results = _attackPlayer(minionCard);
      minionCard = results.minionCard;
      actions.push(results.action);
      continue;
    }
    let possibleTargetIndices = CardActions.indicesInAttackRange(minionCard);
    possibleTargetIndices = _targetsThatCanBeDealtMaxDamage(minionCard, possibleTargetIndices);
    if (possibleTargetIndices.length === 0) {
      break;
    }
    if (possibleTargetIndices.length === 1) {
      actions.push(_attackTarget(minionCard, possibleTargetIndices[0]));
      continue;
    }
    let previousPossibleTargets = [...possibleTargetIndices];
    possibleTargetIndices = _targetsThatCanBeKilled(minionCard, possibleTargetIndices);
    if (possibleTargetIndices.length === 0) {
      actions.push(_attackRandomTarget(minionCard, previousPossibleTargets));
      continue;
    }
    if (possibleTargetIndices.length === 1) {
      actions.push(_attackTarget(minionCard, possibleTargetIndices[0]));
      continue;
    }
    actions.push(_attackRandomTarget(minionCard, possibleTargetIndices));
  }
  return actions;
}

function _attackPlayer(minionCard) {
  let { currentPlayerHealth, updatedAttackerCard } = CardActions.attackPlayer(minionCard, StatusModel.Model.player);
  StatusModel.Model.player.health.current = currentPlayerHealth;
  let updatedMinionCard = {
    ...minionCard,
    card: updatedAttackerCard
  };
  Cards.setCard(CardsModel.Model.cards, updatedMinionCard);
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
    minionCard: updatedMinionCard,
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
  let { updatedCards } = CardActions.attackMinion(CardsModel.Model.cards, minionCard, playerCard);
  let updatedPlayerCard = _getUpdatedCard(playerCard, updatedCards);
  return playerCard.card.health - updatedPlayerCard.card.health;
}

function _getUpdatedCard(cardContext, updatedCards) {
  for (let updatedCard of updatedCards) {
    if (updatedCard.id === cardContext.id && updatedCard.instance === cardContext.instance) {
      return updatedCard;
    }
  }
  Log.error(`Unable to find the updated card: ${cardContext.id}::${cardContext.instance}, returning original`);
  return cardContext;
}

function _attackTarget(minionCard, targetAreaIndex) {
  let playerCard = _getPlayerMinionCardContext(targetAreaIndex);
  let { updatedCards, attackedDiscarded, attackerDiscarded } = CardActions.attackMinion(CardsModel.Model.cards, minionCard, playerCard);
  Cards.setCards(CardsModel.Model.cards, updatedCards);
  if (attackedDiscarded) {
    CardsModel.Model.player.discardPile.push({
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
  return {
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
