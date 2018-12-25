export function getCards(cards, cardInstances) {
  return cardInstances.map((cardInstance) => {
    return {
      ...cardInstance,
      card: getCard(cards, cardInstance.id, cardInstance.instance)
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
export function setCards(cards, cardInstances) {
  for (let cardInstance of cardInstances) {
    setCard(cards, cardInstance);
  }
}

/* @MUTATES: cards */
export function setCard(cards, card) {
  cards[card.id].instances[card.instance] = {
    ...card.card
  };
}

export function getCardAbility(cards, cardId, cardInstance, abilityId) {
  let card = getCard(cards, cardId, cardInstance);
  return getAbility(card, abilityId);
}

export function getAbility(card, abilityId) {
  if (!card || !card.abilities || !card.abilities.length) {
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

/** @MUTATES: cards */
export function setNewCardInstance(card, cardInstance) {
  if (!card.instances) {
    card.instances = {};
  }
  card.instances[cardInstance] = {
    ...card,
    version: 0,
    conditions: {}
  };
  if (card.abilities) {
    card.instances[cardInstance].abilities = _deepCopy(card.abilities);
  }
  delete card.instances[cardInstance].instances;
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

// export function getCardFromHand(player, cards, handCardIndex) {
//   let { cardId, cardInstance } = _getCardIdentifiersFromHand(player.hand, handCardIndex);
//   let card = getCard(cards, cardId, cardInstance);
//   if (!card) {
//     Log.error(`card at handCardIndex: ${handCardIndex} does not exist`);
//   }
//   return card;
// }

// function _getCardIdentifiersFromHand(hand, handCardIndex) {
//   if (!_validHandCardIndex(hand, handCardIndex)) {
//     Log.error(`invalid handCardIndex: ${handCardIndex}`);
//     return null;
//   }
//   const cardId = hand.cards[handCardIndex].id;
//   const cardInstance = hand.cards[handCardIndex].instance;
//   return { cardId, cardInstance };
// }

// function _validHandCardIndex(hand, handCardIndex) {
//   return (!!handCardIndex || handCardIndex === 0) && handCardIndex >= 0 && handCardIndex <= hand.refillSize;
// }