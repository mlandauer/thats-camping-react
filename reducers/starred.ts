import { StarredAction } from '../actions/StarredActions'

export type StarredState = number[]

export function starred(state: StarredState = [], action: StarredAction): StarredState {
  switch(action.type) {
    case 'TOGGLE_STARRED':
      // TODO This all is very long winded. No doubt there is a more elegant way
      const i = state.find((v) => {return v == action.campsite_id})
      if (i == undefined) {
        return state.concat([action.campsite_id])
      } else {
        return state.filter((v) => {return v != action.campsite_id})
      }
    default:
      return state
  }
}
