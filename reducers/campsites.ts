import { Access, Facilities, Park, Position } from '../libs/types'

interface Campsite {
  id: number;
  description: string;
  park_id: number;
  name: string;
  park: Park;
  access: Access;
  facilities: Facilities;
  position: Position;
}

type CampsitesAction = AddCampsitesAction | NoopAction;

interface NoopAction {
  type: 'NOOP'
}

interface AddCampsitesAction {
  type: 'ADD_CAMPSITES';
  campsites: Campsite[];
}

export type CampsitesState = {[index:number] : Campsite};

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
