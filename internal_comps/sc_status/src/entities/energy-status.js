export const getModifiedEnergy = ({max, current}, maxModifier, currentModifier) => {
  return {
    max: setValidEnergy(max + maxModifier),
    current: setValidEnergy(current + currentModifier)
  };
}

export const setValidEnergy = (energy) => {
  if (energy < 0) {
    return 0;
  }
  return energy;
}