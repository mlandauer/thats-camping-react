import expect from 'expect'
import reducer from '../../reducers/parks'
import * as types from '../../constants/ActionTypes'

describe('parks reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual([])
  })

  it('should handle ADD_PARK with existing parks', () => {
    const park1 = {
      id: 1,
      shortName: "Blue Mountains NP",
      longName: "Blue Mountains National Park"
    }
    const park2 = {
      id: 2,
      shortName: "South East Forest NP",
      longName: "South East Forest National Park"
    }

    expect(
      reducer([park1], {
        type: types.ADD_PARK,
        park: park2
      })
    ).toEqual([park1, park2])
  })
})
