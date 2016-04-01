import expect from 'expect'
import reducer from '../../reducers/parks'
import * as types from '../../constants/ActionTypes'

describe('parks reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({})
  })

  it('should handle ADD_PARKS with existing parks', () => {
    const park1 = {
      id: 1,
      longName: "Blue Mountains National Park"
    }
    const park2 = {
      id: 2,
      longName: "South East Forest National Park"
    }
    const park3 = {
      id: 3,
      longName: "Oxley Wild Rivers National Park"
    }

    expect(
      reducer({1: park1}, {
        type: types.ADD_PARKS,
        parks: [park2, park3]
      })
    ).toEqual({1: park1, 2: park2, 3: park3})
  })
})
