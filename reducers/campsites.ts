import { CampsiteOriginal } from '../libs/types'
import { CampsitesAction } from '../actions/CampsitesActions'

export interface CampsitesState {
  readonly [index: number]: CampsiteOriginal
};

export function campsites(state: CampsitesState = {}, action: CampsitesAction): CampsitesState {
  switch(action.type) {
    case 'ADD_CAMPSITES':
      // Turn array in campsites into hash
      let c: {[index: number]: CampsiteOriginal} = {}
      action.campsites.forEach((campsite) => {
        c[campsite.id] = campsite
      })
      return Object.assign({}, state, c)
    default:
      return state
  }
}
