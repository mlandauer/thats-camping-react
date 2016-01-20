import * as types from '../constants/ActionTypes'

export function addCampsites(campsites) {
  return {
    type: types.ADD_CAMPSITES,
    campsites: campsites
  }
}
