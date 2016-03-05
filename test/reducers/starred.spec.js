import expect from 'expect'
import reducer from '../../reducers/starred'
import * as types from '../../constants/ActionTypes'

describe('starred reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual([])
  })

  it('should handle TOGGLE_STARRED', () => {
    expect(
      reducer([1, 5], {
        type: types.TOGGLE_STARRED,
        campsite_id: 3
      })
    ).toEqual([1, 5, 3])
  })

  it('should handle TOGGLE_STARRED', () => {
    expect(
      reducer([1, 5], {
        type: types.TOGGLE_STARRED,
        campsite_id: 1
      })
    ).toEqual([5])
  })
})
