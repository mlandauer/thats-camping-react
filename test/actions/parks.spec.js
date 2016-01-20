import expect from 'expect'
import * as actions from '../../actions/ParkActions'
import * as types from '../../constants/ActionTypes'

describe('actions', () => {
  it('addPark', () => {
    const park = {
      id: 1,
      shortName: "Blue Mountains NP",
      longName: "Blue Mountains National Park"
    }
    const expectedAction = {
      type: types.ADD_PARK,
      park: park
    }
    expect(actions.addPark(park)).toEqual(expectedAction)
  })

  it('addParks', () => {
    const park = {
      id: 1,
      shortName: "Blue Mountains NP",
      longName: "Blue Mountains National Park"
    }
    const expectedAction = {
      type: types.ADD_PARKS,
      parks: [park]
    }
    expect(actions.addParks([park])).toEqual(expectedAction)
  })
})
