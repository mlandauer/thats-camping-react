import { combineReducers } from 'redux'
import campsites from './campsites'
import parks from './parks'
import position from './position'

export default combineReducers({
  campsites,
  parks,
  position
})
