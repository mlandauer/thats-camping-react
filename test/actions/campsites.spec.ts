import * as expect from 'expect'
import * as actions from '../../actions/CampsitesActions'
import { Position, Facilities } from '../../libs/types'

describe('campsites actions', () => {
  it('addCampsitesJson', () => {
    const facilities: Facilities = {
      toilets: "none",
      picnicTables: false,
      barbecues: "none",
      showers: "none",
      drinkingWater: false
    }
    const campsite = {
      id: 1,
      name: "A campsite",
      description: "A nice campsite",
      position: {},
      facilities: facilities,
      access: {
        caravans: false,
        trailers: false,
        car: false
      },
      park_id: 1
    }
    const park = {
      id: 1,
      name: "A park",
      description: "A nice park",
      campsite_ids: [1]
    }
    const json = {
      campsites: [campsite],
      parks: [park]
    }
    const expectedAction = {
      type: 'ADD_CAMPSITES_JSON',
      json: json
    }
    expect(actions.addCampsitesJson(json)).toEqual(expectedAction)
  })
})
