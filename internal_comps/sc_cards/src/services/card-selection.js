export function getCard(cards, cardId, cardInstance) {
  if (!cardId || !cards[cardId] || !cards[cardId].instances) {
    return null;
  }
  return cards[cardId].instances[cardInstance];
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

// export function getCardFromHand(player, cards, handCardIndex) {
//   let { cardId, cardInstance } = _getCardIdentifiersFromHand(player.hand, handCardIndex);
//   let card = getCard(cards, cardId, cardInstance);
//   if (!card) {
//     console.error(`card at handCardIndex: ${handCardIndex} does not exist`);
//   }
//   return card;
// }

// function _getCardIdentifiersFromHand(hand, handCardIndex) {
//   if (!_validHandCardIndex(hand, handCardIndex)) {
//     console.error(`invalid handCardIndex: ${handCardIndex}`);
//     return null;
//   }
//   const cardId = hand.cards[handCardIndex].id;
//   const cardInstance = hand.cards[handCardIndex].instance;
//   return { cardId, cardInstance };
// }

// function _validHandCardIndex(hand, handCardIndex) {
//   return (!!handCardIndex || handCardIndex === 0) && handCardIndex >= 0 && handCardIndex <= hand.refillSize;
// }