import { ADD_PARKS } from '../constants/ActionTypes'

interface Park {
  id: number;
}

interface ParksAction {
  type: string;
  parks: Park[];
}

export type ParksState = {[index:number]: Park}

export function parks(state: ParksState = {}, action: ParksAction): ParksState {
  switch(action.type) {
    case ADD_PARKS:
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
