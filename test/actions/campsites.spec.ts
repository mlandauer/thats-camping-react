import * as expect from 'expect'
import * as actions from '../../actions/CampsitesActions'

describe('campsites actions', () => {
  it('addCampsites', () => {
    const campsite = {
      id: 1,
      name: "A campsite"
    }
    const expectedAction = {
      type: 'ADD_CAMPSITES',
      campsites: [campsite]
    }
    expect(actions.addCampsites([campsite])).toEqual(expectedAction)
  })
})
