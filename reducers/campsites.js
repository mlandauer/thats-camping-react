import { ADD_CAMPSITES } from '../constants/ActionTypes'

export default function campsites(state = {}, action) {
  switch(action.type) {
    case ADD_CAMPSITES:
      // Turn array in campsites into hash
      let c = {}
      action.campsites.forEach((campsite) => {
        c[campsite.id] = campsite
      })
      return Object.assign({}, state, c)
    default:
      return state
  }
}
