import { combineReducers } from 'redux'
import campsites from './campsites'
import parks from './parks'
import position from './position'
import starred from './starred'

export default combineReducers({
  campsites,
  parks,
  position,
  starred
})
