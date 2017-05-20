import { ADD_CAMPSITES } from '../constants/ActionTypes'

interface Campsite {
  id: string;
}

interface CampsitesAction {
  type: string;
  campsites: Campsite[];
}

type CampsitesState = {[index:string] : Campsite};

export default function campsites(state: CampsitesState = {}, action: CampsitesAction): CampsitesState {
  switch(action.type) {
    case ADD_CAMPSITES:
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
