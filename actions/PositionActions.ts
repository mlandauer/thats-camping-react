import { Position } from '../libs/types'

export type PositionAction = UpdatePositionAction | NoopAction;

interface NoopAction {
  type: 'NOOP';
}

interface UpdatePositionAction {
  type: 'UPDATE_POSITION';
  position: Position;
}

export function updatePosition(lat: number, lng: number): PositionAction {
  return {
    type: 'UPDATE_POSITION',
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
