import { UPDATE_POSITION } from '../constants/ActionTypes'

export default function position(state = null, action) {
  switch(action.type) {
    case UPDATE_POSITION:
      return action.position;
    default:
      return state
  }
}
