import * as types from '../constants/ActionTypes'

export function updatePosition(lat, lng) {
  return {
    type: types.UPDATE_POSITION,
    position: {lat: lat, lng: lng}
  }
}
