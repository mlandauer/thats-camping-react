import * as fetch from 'isomorphic-fetch'
import { CampsitesJson } from '../libs/types'

interface NoopAction {
  type: 'NOOP'
}

interface AddCampsitesJsonAction {
  type: 'ADD_CAMPSITES_JSON';
  json: CampsitesJson;
}

export type CampsitesAction = AddCampsitesJsonAction | NoopAction;

export function addCampsitesJson(json: CampsitesJson): CampsitesAction {
  return {
    type: 'ADD_CAMPSITES_JSON',
    json: json
  }
}

export function startSync() {
  return (dispatch: ((action: {}) => void)) => {
    // TODO Also dispatch something immediately to let the user know something is going on
    fetch('/api/data.json')
      .then(response => response.json())
      .then(json => {
        dispatch(addCampsitesJson(json))
      })
  }
}
