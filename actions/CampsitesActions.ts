import * as fetch from 'isomorphic-fetch'
import * as types from '../constants/ActionTypes'
import { addParks } from './ParksActions'

// This is obviously different than other definitions
// TODO: Fix this
interface Campsite {

}

export function addCampsites(campsites: Campsite[]) {
  return {
    type: types.ADD_CAMPSITES,
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
