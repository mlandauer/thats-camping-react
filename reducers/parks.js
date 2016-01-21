import { ADD_PARKS } from '../constants/ActionTypes'

export default function parks(state = {}, action) {
  switch(action.type) {
    case ADD_PARKS:
      // Turn array in parks into hash
      let p = {}
      action.parks.forEach((park) => {
        p[park.id] = park
      })
      return Object.assign({}, state, p)
    default:
      return state
  }
}
