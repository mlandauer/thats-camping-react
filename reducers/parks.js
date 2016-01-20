import { ADD_PARKS } from '../constants/ActionTypes'

export default function parks(state = [], action) {
  switch(action.type) {
    case ADD_PARKS:
      return state.concat(action.parks)
    default:
      return state
  }
}
