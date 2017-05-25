import { ParksAction } from '../actions/ParksActions'

interface Park {
  id: number;
}

export type ParksState = {[index:number]: Park}

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
