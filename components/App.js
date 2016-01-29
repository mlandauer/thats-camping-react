import React from 'react';
import { connect } from 'react-redux'
import { addParks } from '../actions/ParksActions'
import { addCampsites, startSync } from '../actions/CampsitesActions'
import { startUpdatePosition } from '../actions/PositionActions'

export default class App extends React.Component {
  componentWillMount() {
    this.props.dispatch(startSync())
    this.props.dispatch(startUpdatePosition())
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
