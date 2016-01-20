import { ADD_CAMPSITES } from '../constants/ActionTypes'

export default function campsites(state = [], action) {
  switch(action.type) {
    case ADD_CAMPSITES:
      return state.concat(action.campsites)
    default:
      return state
  }
}
