import expect from 'expect'
import reducer from '../../reducers/campsites'
import * as types from '../../constants/ActionTypes'

describe('campsites reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({})
  })

  it('should handle ADD_CAMPSITES with existing campsites', () => {
    const campsite1 = {
      id: 1,
      shortName: "A campsite"
    }
    const campsite2 = {
      id: 2,
      shortName: "Another campsite"
    }
    const campsite3 = {
      id: 3,
      shortName: "And another"
    }

    expect(
      reducer({1: campsite1}, {
        type: types.ADD_CAMPSITES,
        campsites: [campsite2, campsite3]
      })
    ).toEqual({1: campsite1, 2: campsite2, 3: campsite3})
  })
})
