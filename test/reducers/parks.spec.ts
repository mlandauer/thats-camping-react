import * as expect from 'expect'
import { parks as reducer } from '../../reducers/parks'

describe('parks reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {type: 'NOOP'})
    ).toEqual({})
  })

  it('should handle ADD_PARKS with existing parks', () => {
    const park1 = {
      id: 1,
      name: "Blue Mountains National Park"
    }
    const park2 = {
      id: 2,
      name: "South East Forest National Park"
    }
    const park3 = {
      id: 3,
      name: "Oxley Wild Rivers National Park"
    }

    expect(
      reducer({1: park1}, {
        type: 'ADD_PARKS',
        parks: [park2, park3]
      })
    ).toEqual({1: park1, 2: park2, 3: park3})
  })
})
