import * as expect from 'expect'
import { reducer } from '../../reducers/index'

describe('index reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer({}, {type: 'NOOP'})
    ).toEqual({campsites: {}, position: null, starred: []})
  })

  it('should handle UPDATE_POSITION', () => {
    expect(
      reducer({campsites: {}, position: null, starred: []}, {
        type: 'UPDATE_POSITION',
        position: {lat: 3.0, lng: 4.0}
      })
    ).toEqual({campsites: {}, position: {lat: 3.0, lng: 4.0}, starred: []})
  })
})
