export function buildCard(forgeCard) {
  const card = {
    title: null,
    type: forgeCard.type,
    cost: forgeCard.cost,
    rarity: forgeCard.rarity,
    abilities: []
  };
  if (_isNumber(forgeCard.attack)) {
    card.attack = forgeCard.attack;
  }
  if (_isNumber(forgeCard.range)) {
    card.range = forgeCard.range;
  }
  if (_isNumber(forgeCard.health)) {
    card.health = forgeCard.health;
  }
  for (let slot of forgeCard.slots) {
    if (!slot.id) {
      continue;
    }
    card.abilities.push(_getAbility(slot));
  }
  return card;
}

function _isNumber(value) {
  return !!value || value === 0;
}

function _getAbility(slot) {
  const ability = {
    id: slot.id
  };
  if (_isNumber(slot.amount)) {
    ability.amount = slot.amount;
  }
  return ability;
}