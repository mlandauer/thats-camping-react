import * as expect from 'expect'
import { reducer } from '../../reducers/index'

describe('index reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {type: 'NOOP'})
    ).toEqual({campsites: {}, parks: {}, position: null, starred: []})
  })

  it('should handle UPDATE_POSITION', () => {
    expect(
      reducer({campsites: {}, parks: {}, position: null, starred: []}, {
        type: 'UPDATE_POSITION',
        position: {lat: 3.0, lng: 4.0}
      })
    ).toEqual({campsites: {}, parks: {}, position: {lat: 3.0, lng: 4.0}, starred: []})
  })
})