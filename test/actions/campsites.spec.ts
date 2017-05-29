import * as expect from 'expect'
import * as actions from '../../actions/CampsitesActions'
import { Position, Facilities } from '../../libs/types'

describe('campsites actions', () => {
  it('addCampsites', () => {
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
      position: <Position>undefined,
      facilities: facilities,
      access: {
        caravans: false,
        trailers: false,
        car: false
      },
      park_id: <number>undefined
    }
    const expectedAction = {
      type: 'ADD_CAMPSITES',
      campsites: [campsite]
    }
    expect(actions.addCampsites([campsite])).toEqual(expectedAction)
  })
})
