import { Position } from '../libs/types'

export type PositionState = Position | null

type PositionAction = UpdatePositionAction | NoopAction;

interface NoopAction {
  type: 'NOOP';
}

interface UpdatePositionAction {
  type: 'UPDATE_POSITION';
  position: Position;
}

export function position(state: PositionState = null, action: PositionAction): PositionState {
  switch(action.type) {
    case 'UPDATE_POSITION':
      return action.position;
    default:
      return state
  }
}
