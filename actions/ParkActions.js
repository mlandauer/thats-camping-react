import * as types from '../constants/ActionTypes'

export function addPark(park) {
  return {
    type: types.ADD_PARK,
    park: park
  }
}
