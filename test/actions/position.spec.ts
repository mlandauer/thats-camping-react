import * as expect from 'expect'
import * as actions from '../../actions/PositionActions'
import * as types from '../../constants/ActionTypes'

describe('position actions', () => {
  it('updatePosition', () => {
    const expectedAction = {
      type: types.UPDATE_POSITION,
      position: {lat: 1.0, lng: 2.0}
    }
    expect(actions.updatePosition(1.0, 2.0)).toEqual(expectedAction)
  })
})
