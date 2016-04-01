import fetch from 'isomorphic-fetch'
import * as types from '../constants/ActionTypes'
import { addParks } from './ParksActions'

export function addCampsites(campsites) {
  return {
    type: types.ADD_CAMPSITES,
    campsites: campsites
  }
}

export function startSync() {
  return dispatch => {
    // TODO Also dispatch something immediately to let the user know something is going on
    fetch('/api/data.json')
      .then(response => response.json())
      .then(json => {
        dispatch(addParks(json.parks))
        dispatch(addCampsites(json.campsites))
      })
  }
}
