import { Access, Facilities, Park, Position, CampsiteOriginal } from '../libs/types'
import { CampsitesAction } from '../actions/CampsitesActions'

export type CampsitesState = {[index:number] : CampsiteOriginal};

export function campsites(state: CampsitesState = {}, action: CampsitesAction): CampsitesState {
  switch(action.type) {
    case 'ADD_CAMPSITES':
      // Turn array in campsites into hash
      let c: CampsitesState = {}
      action.campsites.forEach((campsite) => {
        c[campsite.id] = campsite
      })
      return Object.assign({}, state, c)
    default:
      return state
  }
}
