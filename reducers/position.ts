import { UPDATE_POSITION } from '../constants/ActionTypes'
import { Position } from '../libs/types'

export type PositionState = Position | null

interface PositionAction {
  type: string;
  position: Position;
}

export function position(state: PositionState = null, action: PositionAction): PositionState {
  switch(action.type) {
    case UPDATE_POSITION:
      return action.position;
    default:
      return state
  }
}
