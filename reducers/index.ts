import { combineReducers } from 'redux'
import { campsites, CampsitesState } from './campsites'
import { parks, ParksState } from './parks'
import { position, PositionState } from './position'
import { starred, StarredState } from './starred'

// Hmmm. I wonder if combineReducers already knows the shape of this type
// so we can do this differently and more elegantly
export interface State {
    campsites: CampsitesState;
    parks: ParksState;
    position: PositionState;
    starred: StarredState;
}

export let reducer = combineReducers({
  campsites,
  parks,
  position,
  starred
})