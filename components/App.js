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
    let children = React.cloneElement(this.props.children, {
      position: this.props.position,
      campsites: this.props.campsites,
      parks: this.props.parks
    });
    // If this application is running in fullscreen on mobile
    // then set class on top level div so that we can easily adjust layout
    // for this case
    let fullscreen = window.navigator.standalone
    return (
      <div id="app" className={fullscreen ? 'fullscreen' : null}>
        {children}
      </div>
    )
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return state
}
// Wrap the component to inject dispatch and state into it
export default connect(select)(App)
