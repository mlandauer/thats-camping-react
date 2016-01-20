import expect from 'expect'
import * as actions from '../../actions/ParkActions'
import * as types from '../../constants/ActionTypes'

describe('actions', () => {
  it('addCampsites', () => {
    const campsite = {
      id: 1,
      shortName: "A campsite"
    }
    const expectedAction = {
      type: types.ADD_CAMPSITES,
      campsites: [campsite]
    }
    expect(actions.addCampsites([campsite])).toEqual(expectedAction)
  })
})
