import { Campsite } from '../libs/types'
import { CampsitesAction } from '../actions/CampsitesActions'

export interface CampsitesState {
  readonly [index: number]: Campsite
};

export function campsites(state: CampsitesState = {}, action: CampsitesAction): CampsitesState {
  switch(action.type) {
    case 'ADD_CAMPSITES_JSON':
      // Turn parks array into hash
      let parksHash: {[index: number]: any} = {}
      action.json.parks.forEach((park) => {
        parksHash[park.id] = park
      })
      // Turn array in campsites into hash
      let c: {[index: number]: Campsite} = {}
      action.json.campsites.forEach((campsite) => {
        let park = parksHash[campsite.park_id]
        c[campsite.id] = Object.assign({}, campsite, {parkName: park.name})
      })
      return Object.assign({}, state, c)
    default:
      return state
  }
}
