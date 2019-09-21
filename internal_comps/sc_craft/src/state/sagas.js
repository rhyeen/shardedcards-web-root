import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as Actions from './actions.js';
import * as CardsActions from '../../../sc_cards/src/state/actions.js';
import * as CraftingInterface from '../services/interface/craft.js';
import * as CraftingSelector from './selectors.js';
import { getCardWithAddedCraftingPart } from '../services/card-modifier.js';
import { localStore } from './store.js';
import { buildCard } from '../services/card-builder.js';

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
  yield put(Actions.finishAddCraftingPart.success(forgeCard));
}

function _getModifiedForgeCard() {
  const state = localStore.getState();
  const { craftingPart, forgeSlot } = CraftingSelector.getSelectedCraftingPartSelector(state);
  const { modifiedCard } = getCardWithAddedCraftingPart(forgeSlot.card, craftingPart);
  return modifiedCard;
}

function* _finishForgingCard() {
  try {
    const finalCard = yield _getFinalCard();
    let { cardName } = yield call(CraftingInterface.getCardName, finalCard);
    finalCard.title = cardName;
    yield put(Actions.finishForgingCard.success(finalCard));
  } catch (e) {
    yield Log.error(`@TODO: unable to _finishForgingCard(): ${e}`);
  }
}

function _getFinalCard() {
  const state = localStore.getState();
  const { card } = CraftingSelector.getSelectedForgeSlotCardSelector(state);
  return buildCard(card);
}

function* _addCraftedCardToDeck(numberOfInstances) {
  try {
    const craftedCard = yield _getCraftedCard();
    yield put(CardsActions.addCardToDeck(craftedCard, numberOfInstances));
    yield put(Actions.addCraftedCardToDeck.success());
  } catch (e) {
    yield Log.error(`@TODO: unable to _addCraftedCardToDeck(): ${e}`);
  }
}

function _getCraftedCard() {
  const state = localStore.getState();
  return CraftingSelector.getFinishedForgeCard(state);
}

export default function* root() {
  yield all([
    takeEvery(Actions.SET_CRAFTING_BASE_CARD.REQUEST, _setCraftingBaseCard),
    takeEvery(Actions.SET_CRAFTING_PARTS.REQUEST, _setCraftingParts),
    takeEvery(Actions.FINISH_ADD_CRAFTING_PART.REQUEST, _finishAddCraftingPart),
    takeEvery(Actions.FINISH_FORGING_CARD.REQUEST, _finishForgingCard),
    takeEvery(Actions.ADD_CRAFTED_CARD_TO_DECK.REQUEST, _addCraftedCardToDeck),
  ]);
}