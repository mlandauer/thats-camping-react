import * as types from '../constants/ActionTypes'

export function updatePosition(lat: number, lng: number) {
  return {
    type: types.UPDATE_POSITION,
    position: {lat: lat, lng: lng}
  }
}

interface Coords {
    latitude: number;
    longitude: number;
}

interface Location {
  coords: Coords;
}

export function startUpdatePosition() {
  return (dispatch: (action: {}) => void) => {
    // TODO Also dispatch something immediately to let the user know something is going on
    let locator = new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject, {enableHighAccuracy: true});
		})
    locator.then((location: Location) => {
      dispatch(updatePosition(location.coords.latitude, location.coords.longitude))
    })
    .catch((err) => {
      console.warn('Error getting location (' + err.code + '): ' + err.message)
    })
  }
}