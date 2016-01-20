import * as types from '../constants/ActionTypes'

export function addParks(parks) {
  return {
    type: types.ADD_PARKS,
    parks: parks
  }
}

export function addCampsites(campsites) {
  return {
    type: types.ADD_CAMPSITES,
    campsites: campsites
  }
}
