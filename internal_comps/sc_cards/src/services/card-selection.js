export function getCard(cards, cardId, cardInstance) {
  if (!cardId || !cards[cardId] || !cards[cardId].instances) {
    return null;
  }
  return cards[cardId].instances[cardInstance];
}

export function getParentCard(cards, cardId) {
  if (!cardId) {
    return null;
  }
  return cards[cardId];
}

export function getCardFromHand(player, handCardIndex) {
  let { cardId, cardInstance } = _getCardIdentifiersFromHand(player.hand, handCardIndex);
  let card = getCard(player.cards, cardId, cardInstance);
  if (!card) {
    console.error(`card at handCardIndex: ${handCardIndex} does not exist`);
  }
  return card;
}

function _getCardIdentifiersFromHand(hand, handCardIndex) {
  if (!_validHandCardIndex(hand, handCardIndex)) {
    console.error(`invalid handCardIndex: ${handCardIndex}`);
    return null;
  }
  const cardId = hand.cards[handCardIndex].id;
  const cardInstance = hand.cards[handCardIndex].instance;
  return { cardId, cardInstance };
}

function _validHandCardIndex(hand, handCardIndex) {
  return (!!handCardIndex || handCardIndex === 0) && handCardIndex >= 0 && handCardIndex <= hand.refillSize;
}