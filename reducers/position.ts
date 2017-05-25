import { Position } from '../libs/types'
import { PositionAction } from '../actions/PositionActions'

export type PositionState = Position | null

export function position(state: PositionState = null, action: PositionAction): PositionState {
  switch(action.type) {
    case 'UPDATE_POSITION':
      return action.position;
    default:
      return state
  }
}
