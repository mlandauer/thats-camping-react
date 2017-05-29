import * as fetch from 'isomorphic-fetch'
import { CampsiteOriginal, ParkOriginal } from '../libs/types'

interface NoopAction {
  type: 'NOOP'
}

interface AddCampsitesAction {
  type: 'ADD_CAMPSITES';
  campsites: CampsiteOriginal[];
  parks: ParkOriginal[];
}

export type CampsitesAction = AddCampsitesAction | NoopAction;

export function addCampsites(campsites: CampsiteOriginal[], parks: ParkOriginal[]): CampsitesAction {
  return {
    type: 'ADD_CAMPSITES',
    campsites: campsites,
    parks: parks
  }
}

export function startSync() {
  return (dispatch: ((action: {}) => void)) => {
    // TODO Also dispatch something immediately to let the user know something is going on
    fetch('/api/data.json')
      .then(response => response.json())
      .then(json => {
        dispatch(addCampsites(json.campsites, json.parks))
      })
  }
}
