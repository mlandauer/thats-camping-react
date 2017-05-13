import React from 'react';
import { connect } from 'react-redux'
import { addParks } from '../actions/ParksActions'
import { addCampsites, startSync } from '../actions/CampsitesActions'
import { startUpdatePosition } from '../actions/PositionActions'
import { toggleStarredCampsite } from '../actions/StarredActions'

export class App extends React.Component {
  componentWillMount() {
    this.props.dispatch(startSync())
    this.props.dispatch(startUpdatePosition())
  }

  onStarClick(id) {
    console.log("The star for campsite " + id + " has been clicked!")
  }

  render() {
    let children = React.cloneElement(this.props.children, {
      onStarClick: this.props.onStarClick,
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
function mapStateToProps(state) {
  // Put the star state directly into each campsite object to make things easier
  // elsewhere
  // Ugh. This is all fairly horrible
  let new_campsites = {}
  for (var id in state.campsites) {
    // Don't want to use strict equality (with indexOf) as a workaround
    let i = state.starred.findIndex((v) => {return v == id})
    let starred = i != -1
    new_campsites[id] = Object.assign({}, state.campsites[id], {starred: starred})
  }
  return Object.assign({}, state, {campsites: new_campsites})
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    onStarClick: (id) => {
      dispatch(toggleStarredCampsite(id))
    }
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(App)
