import * as CardsModel from '../../../../../../sc_cards/src/services/interface/mock/models/model.js';
import * as StatusModel from '../../../../../../sc_status/src/services/interface/mock/models/model.js';
import { Log } from '../../../../../../sc_shared/src/services/logger.js';
import { Cards } from '../../../../../../sc_cards/src/services/card-selection.js';
import * as CardActions from '../../../../../../sc_cards/src/services/card-actions.js';
import { ACTION_TYPES, ACTION_TARGET_TYPES } from '../../../../../../sc_shared/src/entities/turn-keywords.js';

const MAX_LOOP_ITERATIONS = 10;

export const getOpponentTurn = () => {
  let fieldPlayOrder = _getOpponentMinionPlayOrder();
  let turn = [];
  for (let fieldPlayCard of fieldPlayOrder) {
    let cardActions = _getFieldMinionActions(fieldPlayCard);
    turn.push(...cardActions);
  }
  return turn;
}

function _getOpponentMinionPlayOrder() {
  // @TODO: check if card is "aggressive" or "cautious".  An aggressive card tries to go first
  // a cautious card tries to go last.
  return _getMinionIndicesOnField();
}

function _getMinionIndicesOnField() {
  let minionCard = [];
  if (_minionOnFieldIndex(0)) {
    minionCard.push(_getMinionCardDetails(0));
  }
  if (_minionOnFieldIndex(1)) {
    minionCard.push(_getMinionCardDetails(1));
  }
  if (_minionOnFieldIndex(2)) {
    minionCard.push(_getMinionCardDetails(2));
  }
  return minionCard;
}

function _minionOnFieldIndex(playAreaIndex) {
  return !!CardsModel.Model.opponent.field.slots[playAreaIndex].id;
}

function _getMinionCardDetails(playAreaIndex) {
  let id = CardsModel.Model.opponent.field.slots[playAreaIndex].id;
  let instance = CardsModel.Model.opponent.field.slots[playAreaIndex].instance;
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
    let possibleTargets = _playerMinionsThatCanBeReached(minionCard);
    possibleTargets = _targetsThatCanBeDealtMaxDamage(minionCard, possibleTargets);
    if (possibleTargets.length === 0) {
      break;
    }
    if (possibleTargets.length === 1) {
      actions.push(_attackTarget(minionCard, possibleTargets[0]));
      continue;
    }
    let previousPossibleTargets = [...possibleTargets];
    possibleTargets = _targetsThatCanBeKilledAtMaxDamage(minionCard, possibleTargets);
    if (possibleTargets.length === 0) {
      actions.push(_attackRandomTarget(minionCard, previousPossibleTargets));
      continue;
    }
    if (possibleTargets.length === 1) {
      actions.push(_attackTarget(minionCard, possibleTargets[0]));
      continue;
    }
    actions.push(_attackRandomTarget(minionCard, possibleTargets));
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

    // @TODO: continue here
    console.trace('HERE');


function _canAttackPlayer(state, playAreaIndex) {
  const inRangeTargets = _possibleTargetsInRange(state, playAreaIndex)
  for (let targetFieldIndex of inRangeTargets) {
    if (!_playerCardOnFieldIndex(state, targetFieldIndex)) {
      return true
    }
  }
  return false
}

function _possibleTargetsInRange(state, playAreaIndex) {
  const inRangeFieldIndices = []
  const cardId = state.opponentField[playAreaIndex].id
  const cardInstance = state.opponentField[playAreaIndex].instance
  const card = GetCard(state.opponentCards, cardId, cardInstance)
  if (card.conditions.exhausted) {
    return inRangeFieldIndices
  }
  if (_indexWithinRange(card.range, playAreaIndex, 0)) {
    inRangeFieldIndices.push(0)
  }
  if (_indexWithinRange(card.range, playAreaIndex, 1)) {
    inRangeFieldIndices.push(1)
  }
  if (_indexWithinRange(card.range, playAreaIndex, 2)) {
    inRangeFieldIndices.push(2)
  }
  return inRangeFieldIndices
}

function _indexWithinRange(range, playAreaIndex, targetFieldIndex) {
  return Math.abs(targetFieldIndex - playAreaIndex) < range
}

function _playerCardOnFieldIndex(state, playAreaIndex) {
  return !!state.playerField[playAreaIndex].id
}

function _attackPlayer(state, playAreaIndex) {
  const cardId = state.opponentField[playAreaIndex].id
  const cardInstance = state.opponentField[playAreaIndex].instance
  const opponentCard = GetCard(state.opponentCards, cardId, cardInstance)
  GetAttackingPlayerResults(opponentCard)
  return {
    type: ATTACK_PLAYER,
    opponentFieldCardIndex: playAreaIndex
  }
}

// @NOTE: pretty sure we don't need because _targetsThatCanBeDealtMaxDamage
// already checks targets that can be damaged.
// function _targetsThatCanBeDamaged(state, playAreaIndex) {
//   const possibleTargets = []
//   const inRangeTargets = _possibleTargetsInRange(state, playAreaIndex)
//   for (let targetFieldIndex of inRangeTargets) {
//     if (_healthLostFromAttack(state, playAreaIndex, targetFieldIndex) > 0) {
//       possibleTargets.push(targetFieldIndex)
//     }
//   }
//   return possibleTargets
// }

function _healthLostFromAttack(state, playAreaIndex, targetFieldIndex) {
  let cardId = state.opponentField[playAreaIndex].id
  let cardInstance = state.opponentField[playAreaIndex].instance
  const opponentCard = GetCard(state.opponentCards, cardId, cardInstance)
  cardId = state.playerField[targetFieldIndex].id
  cardInstance = state.playerField[targetFieldIndex].instance
  const playerCard = GetCard(state.cards, cardId, cardInstance)
  const resultingPlayerCard = GetAttackedCardResults(opponentCard, playerCard)
  if (resultingPlayerCard.health < 0) {
    resultingPlayerCard.health = 0
  }
  return playerCard.health - resultingPlayerCard.health
}

function _attackTarget(state, playAreaIndex, targetFieldIndex) {
  let cardId = state.opponentField[playAreaIndex].id
  let cardInstance = state.opponentField[playAreaIndex].instance
  const opponentCard = GetCard(state.opponentCards, cardId, cardInstance)
  cardId = state.playerField[targetFieldIndex].id
  cardInstance = state.playerField[targetFieldIndex].instance
  const playerCard = GetCard(state.cards, cardId, cardInstance)
  GetAttackedCardResults(opponentCard, playerCard, true)
  GetAttackingCardResults(opponentCard, playerCard, true)
  return {
    type: ATTACK_CARD,
    playerFieldCardIndex: targetFieldIndex,
    opponentFieldCardIndex: playAreaIndex
  }
}

function _targetsThatCanBeDealtMaxDamage(state, playAreaIndex) {
  const possibleTargets = []
  const damageDealtPairings = []
  let maxDamage = 1
  const inRangeTargets = _possibleTargetsInRange(state, playAreaIndex)
  for (let targetFieldIndex of inRangeTargets) {
    let damageDealt = _healthLostFromAttack(state, playAreaIndex, targetFieldIndex)
    if (damageDealt >= maxDamage) {
      maxDamage = damageDealt
      possibleTargets.push(targetFieldIndex)
      damageDealtPairings.push(damageDealt)
    }
  }
  const possibleMaxDamageTargets = []
  for (let index of possibleTargets.keys()) {
    if (damageDealtPairings[index] === maxDamage) {
      possibleMaxDamageTargets.push(possibleTargets[index])
    }
  }
  return possibleMaxDamageTargets
}

function _attackRandomTarget(state, playAreaIndex, targetFieldIndices) {
  return _attackTarget(state, playAreaIndex, _getRandomItemFromArray(targetFieldIndices))
}

function _getRandomItemFromArray(arr) {
  return arr[Math.floor(Math.random()*arr.length)]
}

function _targetsThatCanBeKilledAtMaxDamage(state, playAreaIndex, possibleTargets) {
  const possibleKilledTargets = []
  for (let targetFieldIndex of possibleTargets) {
    if (_healthRemainingFromAttack(state, playAreaIndex, targetFieldIndex) <= 0) {
      possibleKilledTargets.push(targetFieldIndex)
    }
  }
  return possibleKilledTargets
}

function _healthRemainingFromAttack(state, playAreaIndex, targetFieldIndex) {
  let cardId = state.opponentField[playAreaIndex].id
  let cardInstance = state.opponentField[playAreaIndex].instance
  const opponentCard = GetCard(state.opponentCards, cardId, cardInstance)
  cardId = state.playerField[targetFieldIndex].id
  cardInstance = state.playerField[targetFieldIndex].instance
  const playerCard = GetCard(state.cards, cardId, cardInstance)
  const resultingPlayerCard = GetAttackedCardResults(opponentCard, playerCard)
  return resultingPlayerCard.health
}

export const SetOpponentTurnResults = (turn, state = null, status = null) => {
  for (let action of turn) {
    _recordOpponentAction(state, status, action)
  }
  if (!status) {
    return null
  }
  return status.health.current
}

const _recordOpponentAction = (state, status, action) => {
  switch(action.type) {
    case ATTACK_CARD:
      return _recordAttackPlayerCardAction(state, action)
    case ATTACK_PLAYER:
      return _recordAttackPlayerAction(state, status, action)
    default:
      console.error(`Unexpected action type: ${action.type}`)
  }
}

const _recordAttackPlayerCardAction = (state, action) => {
  AttackPlayerCardResults(state, action.playerFieldCardIndex, action.opponentFieldCardIndex)
}

const _recordAttackPlayerAction = (state, status, action) => {
  AttackPlayerResults(state, action.opponentFieldCardIndex, status)
}