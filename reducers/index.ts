import { combineReducers } from 'redux'
import { campsites, CampsitesState } from './campsites'
import { position, PositionState } from './position'
import { starred, StarredState } from './starred'

// Hmmm. I wonder if combineReducers already knows the shape of this type
// so we can do this differently and more elegantly
export interface State {
    readonly campsites: CampsitesState;
    readonly position: PositionState;
    readonly starred: StarredState;
}

export let reducer = combineReducers({
  campsites,
  position,
  starred
})
