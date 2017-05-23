import * as expect from 'expect'
import * as actions from '../../actions/StarredActions'

describe('starred actions', () => {
  it('toggleStarredCampsite', () => {
    const expectedAction = {
      type: 'TOGGLE_STARRED',
      campsite_id: 3
    }
    expect(actions.toggleStarredCampsite(3)).toEqual(expectedAction)
  })
})
