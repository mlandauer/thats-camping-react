export type StarredAction = ToggleStarredAction | NoopAction;

interface NoopAction {
  type: 'NOOP'
}

interface ToggleStarredAction {
  type: 'TOGGLE_STARRED';
  campsite_id: number;
}

export function toggleStarredCampsite(campsite_id: number): StarredAction {
  return {
    type: 'TOGGLE_STARRED',
    campsite_id: campsite_id
  }
}
