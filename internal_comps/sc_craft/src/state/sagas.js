import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as Actions from './actions.js';
import * as CraftingInterface from '../services/interface/craft.js';
import * as CraftingSelector from './selectors.js';
import { getCardWithAddedCraftingPart } from '../services/card-modifier.js';
import { localStore } from './store.js';
import { buildCardDetails } from '../services/card-builder.js';
import * as GameDispatchActions from '../../../sc_game/src/state/actions.js';
import { ACTION_TYPES } from '../../../sc_shared/src/entities/turn-keywords.js';

function* _setCraftingBaseCard() {
  try {
    let { craftingBaseCard } = yield call(CraftingInterface.getCraftingBaseCard);
    yield put(Actions.setCraftingBaseCard.success(craftingBaseCard));
  } catch (e) {
    yield Log.error(`@TODO: unable to _setCraftingBaseCard(): ${e}`);
  }
}

function* _setCraftingParts() {
  try {
    let { craftingParts } = yield call(CraftingInterface.getCraftingParts);
    yield put(Actions.setCraftingParts.success(craftingParts));
  } catch (e) {
    yield Log.error(`@TODO: unable to _setCraftingParts(): ${e}`);
  }
}

function* _finishAddCraftingPart() {
  const forgeCard = yield _getModifiedForgeCard();
  const action = yield _getAddCraftingPartAction();
  yield put(GameDispatchActions.recordAction(action));
  yield put(Actions.finishAddCraftingPart.success(forgeCard));
}

function _getModifiedForgeCard() {
  const state = localStore.getState();
  const { craftingPart, forgeSlot } = CraftingSelector.getSelectedCraftingPartSelector(state);
  const { modifiedCard } = getCardWithAddedCraftingPart(forgeSlot.card, craftingPart);
  return modifiedCard;
}

function _getAddCraftingPartAction() {
  const state = localStore.getState();
  const { craftingPartIndex, forgeSlotIndex } = CraftingSelector.getSelectedCraftingPartSelector(state);
  return {
    type: ACTION_TYPES.ADD_CRAFTING_PART,
    craftingPartIndex,
    forgeSlotIndex
  };
}

function* _finishForgingCard() {
  try {
    const finalCard = yield _getFinalCard();
    let { cardName, cardId } = yield call(CraftingInterface.getCardName, finalCard);
    finalCard.title = cardName;
    finalCard.id = cardId;
    yield put(Actions.finishForgingCard.success(finalCard));
  } catch (e) {
    yield Log.error(`@TODO: unable to _finishForgingCard(): ${e}`);
  }
}

function _getFinalCard() {
  const state = localStore.getState();
  const { card } = CraftingSelector.getSelectedForgeSlotCardSelector(state);
  return buildCardDetails(card);
}

function* _addCraftedCardToDeck({numberOfInstances}) {
  // @NOTE: I originally added the card to the actual discard pile, but since we don't have
  // the instance ids yet, it's a futile effort.
  const action = yield _getAddCraftedCardToDeckAction(numberOfInstances);
  yield put(GameDispatchActions.recordAction(action));
  yield put(Actions.addCraftedCardToDeck.success());
}

function _getAddCraftedCardToDeckAction(numberOfInstances) {
  const state = localStore.getState();
  const { forgeSlotIndex } = CraftingSelector.getSelectedForgeSlotCardSelector(state);  
  return {
    type: ACTION_TYPES.ADD_CRAFTED_CARD_TO_DECK,
    numberOfInstances,
    forgeSlotIndex
  };
}

function* _finishForgeSelectedCraftingBaseCard({forgeSlotIndex}) {
  const action = yield _getForgeBaseCardAction(forgeSlotIndex);
  yield put(GameDispatchActions.recordAction(action));
  yield put(Actions.finishForgeSelectedCraftingBaseCard.success(forgeSlotIndex));
}

function _getForgeBaseCardAction(forgeSlotIndex) {
  return {
    type: ACTION_TYPES.CRAFT_BASE_CARD,
    forgeSlotIndex
  };
}

export default function* root() {
  yield all([
    takeEvery(Actions.SET_CRAFTING_BASE_CARD.REQUEST, _setCraftingBaseCard),
    takeEvery(Actions.SET_CRAFTING_PARTS.REQUEST, _setCraftingParts),
    takeEvery(Actions.FINISH_ADD_CRAFTING_PART.REQUEST, _finishAddCraftingPart),
    takeEvery(Actions.FINISH_FORGING_CARD.REQUEST, _finishForgingCard),
    takeEvery(Actions.ADD_CRAFTED_CARD_TO_DECK.REQUEST, _addCraftedCardToDeck),
    takeEvery(Actions.FINISH_FORGE_SELECTED_CRAFTING_BASE_CARD.REQUEST, _finishForgeSelectedCraftingBaseCard),
  ]);
}