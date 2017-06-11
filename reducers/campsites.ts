import { Campsite, Position } from '../libs/types'
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
        // Convert weird representation of undefined position in json to how we should do it
        let position : (Position | undefined) = convertPosition(campsite.position)
        c[campsite.id] = Object.assign({}, campsite, {parkName: park.name, position: position})
      })
      return Object.assign({}, state, c)
    default:
      return state
  }
}

function positionIsSet(position: Position | {}): position is Position {
  return (position !== {});
}

function convertPosition(position: Position | {}): (Position | undefined) {
  if ((<Position>position).lat && (<Position>position).lng) {
    return <Position>position
  } else {
    return undefined
  }
}
