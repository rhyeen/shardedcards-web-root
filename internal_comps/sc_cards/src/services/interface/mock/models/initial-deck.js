import {
  ENERGY_SHARD } from '../../../../../../sc_shared/src/entities/card-keywords.js';

export function getInitialDeck() {
  return [
    {
      id: ENERGY_SHARD.ID,
      instance: ENERGY_SHARD.INSTANCE
    },
    {
      id: 'rangedweapon',
      instance: '1'
    },
    {
      id: 'incinerate',
      instance: '1'
    },
    {
      id: 'ravager',
      instance: '2'
    },
    {
      id: 'rangedweapon',
      instance: '3'
    },
    {
      id: 'pawn',
      instance: '2'
    },
    {
      id: 'monster',
      instance: '2'
    },
    {
      id: 'incinerate',
      instance: '3'
    },
    {
      id: 'ravager',
      instance: '4'
    },
    {
      id: 'rangedweapon',
      instance: '5'
    }
  ];
}
