import React from 'react';
import { connect } from 'react-redux'
import { addParks } from '../actions/ParksActions'
import { addCampsites, startSync } from '../actions/CampsitesActions'
import { startUpdatePosition } from '../actions/PositionActions'
import { toggleStarredCampsite } from '../actions/StarredActions'

export default class App extends React.Component {
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
function select(state) {
  return state
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
export default connect(select, mapDispatchToProps)(App)
