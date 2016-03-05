import * as types from '../constants/ActionTypes'

export function toggleStarredCampsite(campsite_id) {
  return {
    type: types.TOGGLE_STARRED,
    campsite_id: campsite_id
  }
}
