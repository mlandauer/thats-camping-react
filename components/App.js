import React from 'react';
import { connect } from 'react-redux'
import data from './../data';
import { addParks } from '../actions/ParksActions'
import { addCampsites, startSync } from '../actions/CampsitesActions'
import { updatePosition } from '../actions/PositionActions'
import PromisedLocation from 'promised-location'

export default class App extends React.Component {
  componentWillMount() {
    this.props.dispatch(startSync())
    this.startUpdateLocation();
  }

  startUpdateLocation() {
    let locator = new PromisedLocation({enableHighAccuracy: true})
    locator.then((location) => {
      this.props.dispatch(updatePosition(location.coords.latitude, location.coords.longitude))
    })
    .catch((err) => {
      console.warn('Error getting location (' + err.code + '): ' + err.message)
    })
  }

  render() {
    return React.cloneElement(this.props.children, {
      position: this.props.position,
      campsites: this.props.campsites,
      parks: this.props.parks
    });
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return state
}
// Wrap the component to inject dispatch and state into it
export default connect(select)(App)
