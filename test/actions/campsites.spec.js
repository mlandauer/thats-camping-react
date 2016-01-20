import expect from 'expect'
import * as actions from '../../actions/ParkActions'
import * as types from '../../constants/ActionTypes'

describe('actions', () => {
  it('should do some basic arithmetic', () => {
    expect(1+1).toEqual(2)
  })

  it('addPark', () => {
    const park = {
      id: 1,
      shortName: "Blue Mountains NP",
      longName: "Blue Mountains National Park"
    }
    const expectedAction = {
      type: types.ADD_PARK,
      park
    }
    expect(actions.addPark(park)).toEqual(expectedAction)
  })
})
