// This is obviously a different definition than Park elsewhere.
// TODO: Change this
interface Park {

}

export function addParks(parks: Park[]) {
  return {
    type: 'ADD_PARKS',
    parks: parks
  }
}
