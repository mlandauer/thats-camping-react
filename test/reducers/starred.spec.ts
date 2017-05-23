import * as expect from 'expect'
import { starred as reducer } from '../../reducers/starred'

describe('starred reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {type: 'NOOP'})
    ).toEqual([])
  })

  it('should handle TOGGLE_STARRED', () => {
    expect(
      reducer([1, 5], {
        type: 'TOGGLE_STARRED',
        campsite_id: 3
      })
    ).toEqual([1, 5, 3])
  })

  it('should handle TOGGLE_STARRED', () => {
    expect(
      reducer([1, 5], {
        type: 'TOGGLE_STARRED',
        campsite_id: 1
      })
    ).toEqual([5])
  })
})
