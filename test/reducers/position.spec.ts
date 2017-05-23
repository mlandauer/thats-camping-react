import * as expect from 'expect'
import { position as reducer } from '../../reducers/position'
import * as types from '../../constants/ActionTypes'

describe('position reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {type: 'NOOP'})
    ).toEqual(null)
  })

  it('should handle UPDATE_POSITION', () => {
    expect(
      reducer({lat: 1.0, lng: 2.0}, {
        type: types.UPDATE_POSITION,
        position: {lat: 3.0, lng: 4.0}
      })
    ).toEqual({lat: 3.0, lng: 4.0})
  })
})
