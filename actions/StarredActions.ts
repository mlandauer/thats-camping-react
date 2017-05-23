export function toggleStarredCampsite(campsite_id: number) {
  return {
    type: 'TOGGLE_STARRED',
    campsite_id: campsite_id
  }
}
