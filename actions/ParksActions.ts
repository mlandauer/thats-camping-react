import { ParkOriginal } from '../libs/types'

export type ParksAction = AddParksAction | NoopAction;

interface NoopAction {
  type: 'NOOP';
}

interface AddParksAction {
  type: 'ADD_PARKS';
  parks: ParkOriginal[];
}

export function addParks(parks: ParkOriginal[]): ParksAction {
  return {
    type: 'ADD_PARKS',
    parks: parks
  }
}
