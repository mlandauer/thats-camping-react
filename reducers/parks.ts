import { ParksAction } from '../actions/ParksActions'
import { ParkOriginal } from '../libs/types'

export type ParksState = {[index:number]: ParkOriginal}

export function parks(state: ParksState = {}, action: ParksAction): ParksState {
  switch(action.type) {
    case 'ADD_PARKS':
      // Turn array in parks into hash
      let p: ParksState = {}
      action.parks.forEach((park) => {
        p[park.id] = park
      })
      return Object.assign({}, state, p)
    default:
      return state
  }
}
