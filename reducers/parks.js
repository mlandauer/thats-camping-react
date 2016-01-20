import { ADD_PARK } from '../constants/ActionTypes'

export default function parks(state = [], action) {
  switch(action.type) {
    case ADD_PARK:
      return [...state, action.park]
    default:
      return state
  }
}
