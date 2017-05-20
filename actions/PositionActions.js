import * as types from '../constants/ActionTypes'

export function updatePosition(lat, lng) {
  return {
    type: types.UPDATE_POSITION,
    position: {lat: lat, lng: lng}
  }
}

export function startUpdatePosition() {
  return dispatch => {
    // TODO Also dispatch something immediately to let the user know something is going on
    let locator = new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject, {enableHighAccuracy: true});
		})
    locator.then((location) => {
      dispatch(updatePosition(location.coords.latitude, location.coords.longitude))
    })
    .catch((err) => {
      console.warn('Error getting location (' + err.code + '): ' + err.message)
    })
  }
}
