import * as expect from 'expect'
import { campsites as reducer } from '../../reducers/campsites'
import { Position, Facilities } from '../../libs/types'

describe('campsites reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {type: "NOOP"})
    ).toEqual({})
  })

  // TODO: Add test for Position {} getting converted to undefined
  it('should convert empty position for campsite to undefined', () => {
    let park = {
      id: 1,
      name: "A park",
      description: "A nice park",
      campsite_ids: []
    }
    let campsite = {
      id: 1,
      name: "A campsite",
      description: "A nice campsite",
      position: {},
      facilities: {
        toilets: 'none' as 'none',
        picnicTables: false,
        barbecues: 'none' as 'none',
        showers: 'none' as 'none',
        drinkingWater: false
      },
      access: {
        caravans: false,
        trailers: false,
        car: false
      },
      park_id: 1
    }
    expect(reducer(undefined, {
      type: 'ADD_CAMPSITES_JSON',
      json: {
        campsites: [campsite],
        parks: [park]
      }
    })).toEqual({1: {
      id: 1,
      name: "A campsite",
      description: "A nice campsite",
      position: undefined,
      facilities: {
        toilets: 'none' as 'none',
        picnicTables: false,
        barbecues: 'none' as 'none',
        showers: 'none' as 'none',
        drinkingWater: false
      },
      access: {
        caravans: false,
        trailers: false,
        car: false
      },
      park_id: 1,
      parkName: "A park"
    }})
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
      park_id: 1,
      access: {
        caravans: false,
        trailers: false,
        car: false
      },
      facilities: facilities,
      position: {lat: 1.0, lng: 2.0}
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
    const park = {
      id: 1,
      name: "A park",
      description: "A nice park",
      campsite_ids: [1]
    }
    const campsiteInState1 = Object.assign({}, campsite1, {parkName: park.name})
    const campsiteInState2 = Object.assign({}, campsite2, {parkName: park.name})
    const campsiteInState3 = Object.assign({}, campsite3, {parkName: park.name})
    expect(
      reducer({1: campsiteInState1}, {
        type: 'ADD_CAMPSITES_JSON',
        json: {
          campsites: [campsite2, campsite3],
          parks: [park]
        }
      })
    ).toEqual({1: campsiteInState1, 2: campsiteInState2, 3: campsiteInState3})
  })
})
