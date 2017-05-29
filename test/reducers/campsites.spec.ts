import * as expect from 'expect'
import { campsites as reducer } from '../../reducers/campsites'
import { Park, Position, Facilities } from '../../libs/types'

describe('campsites reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {type: "NOOP"})
    ).toEqual({})
  })

  it('should handle ADD_CAMPSITES with existing campsites', () => {
    const facilities: Facilities = {
      toilets: 'none',
      picnicTables: false,
      barbecues: 'none',
      showers: 'none',
      drinkingWater: false
    }
    const templateCampsite = {
      description: "",
      park_id: <number>undefined,
      park: <Park>undefined,
      access: {
        caravans: false,
        trailers: false,
        car: false
      },
      facilities: facilities,
      position: <Position>undefined
    }

    const campsite1 = Object.assign({}, templateCampsite, {
      id: 1,
      name: "A campsite"
    })
    const campsite2 = Object.assign({}, templateCampsite, {
      id: 2,
      name: "Another campsite"
    })
    const campsite3 = Object.assign({}, templateCampsite, {
      id: 3,
      name: "And another"
    })

    expect(
      reducer({1: campsite1}, {
        type: 'ADD_CAMPSITES',
        campsites: [campsite2, campsite3]
      })
    ).toEqual({1: campsite1, 2: campsite2, 3: campsite3})
  })
})
