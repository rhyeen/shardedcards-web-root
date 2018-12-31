import { Log } from "../../../sc_shared/src/services/logger";
import { CARD_ABILITIES } from "../../../sc_shared/src/entities/card-keywords";


export function getCards(cards, cardContexts) {
  return cardContexts.map((cardContext) => {
    return {
      ...cardContext,
      card: getCard(cards, cardContext.id, cardContext.instance)
    };
  });
}

export function getCard(cards, cardId, cardInstance) {
  if (!cardId || !cards[cardId] || !cards[cardId].instances) {
    return null;
  }
  return cards[cardId].instances[cardInstance];
}

/* @MUTATES: cards */
export function setCards(cards, cardContexts) {
  for (let cardContext of cardContexts) {
    setCard(cards, cardContext);
  }
}

/* @MUTATES: cards */
export function setCard(cards, cardContext) {
  cards[cardContext.id].instances[cardContext.instance] = {
    ...cardContext.card
  };
}

export function getCardAbility(cards, cardId, cardInstance, abilityId) {
  let card = getCard(cards, cardId, cardInstance);
  return getAbility(card, abilityId);
}

export function getAbility(card, abilityId) {
  if (!card || !card.abilities || !card.abilities.length || !abilityId) {
    return null;
  }
  for (let ability of card.abilities) {
    if (ability.id === abilityId) {
      return ability;
    }
  }
  return null;
}

export function getParentCard(cards, cardId) {
  if (!cardId) {
    return null;
  }
  return cards[cardId];
}

/** @MUTATES: card */
export function setNewCardInstance(parentCard, cardInstance) {
  if (!parentCard.instances) {
    parentCard.instances = {};
  }
  parentCard.instances[cardInstance] = {
    ...parentCard,
    version: 0,
    conditions: {}
  };
  if (parentCard.abilities) {
    parentCard.instances[cardInstance].abilities = _deepCopy(parentCard.abilities);
  }
  delete parentCard.instances[cardInstance].instances;
}

function _deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function hasHaste(card) {
  return !!getAbility(card, CARD_ABILITIES.HASTE);
}

export function isExhausted(card) {
  if (!card.conditions) {
    return false;
  }
  return card.conditions.exhausted;
}

export function isDead(card) {
  return card.health <= 0;
}

export function getUpdatedCard(cardContext, updatedCards) {
  for (let updatedCard of updatedCards) {
    if (updatedCard.id === cardContext.id && updatedCard.instance === cardContext.instance) {
      return updatedCard;
    }
  }
  Log.error(`Unable to find the updated card: ${cardContext.id}::${cardContext.instance}, returning original`);
  return cardContext;
}
