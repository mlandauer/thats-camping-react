import * as fetch from 'isomorphic-fetch'
import { addParks } from './ParksActions'
import { CampsiteOriginal } from '../libs/types'

interface NoopAction {
  type: 'NOOP'
}

interface AddCampsitesAction {
  type: 'ADD_CAMPSITES';
  campsites: CampsiteOriginal[];
}

export type CampsitesAction = AddCampsitesAction | NoopAction;

export function addCampsites(campsites: CampsiteOriginal[]): CampsitesAction {
  return {
    type: 'ADD_CAMPSITES',
    campsites: campsites
  }
}

export function startSync() {
  return (dispatch: ((action: {}) => void)) => {
    // TODO Also dispatch something immediately to let the user know something is going on
    fetch('/api/data.json')
      .then(response => response.json())
      .then(json => {
        dispatch(addParks(json.parks))
        dispatch(addCampsites(json.campsites))
      })
  }
}
