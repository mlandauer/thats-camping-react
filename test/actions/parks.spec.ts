import * as expect from 'expect'
import * as actions from '../../actions/ParksActions'

describe('parks actions', () => {
  it('addParks', () => {
    const park = {
      id: 1,
      name: "Blue Mountains National Park",
      description: "Pretty Fancy",
      campsite_ids: <number[]>[]
    }
    const expectedAction = {
      type: 'ADD_PARKS',
      parks: [park]
    }
    expect(actions.addParks([park])).toEqual(expectedAction)
  })
})
