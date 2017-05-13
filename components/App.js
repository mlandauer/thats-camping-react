import React from 'react';
import { connect } from 'react-redux'
import { addParks } from '../actions/ParksActions'
import { addCampsites, startSync } from '../actions/CampsitesActions'
import { startUpdatePosition } from '../actions/PositionActions'
import { toggleStarredCampsite } from '../actions/StarredActions'
import CampsiteIndexPage from './CampsiteIndexPage';
import { Route, Redirect } from 'react-router-dom';
import AboutPage from './AboutPage'
import CampsiteDetailPage from './CampsiteDetailPage';
import ParkDetailPage from './ParkDetailPage';

export class App extends React.Component {
  componentWillMount() {
    this.props.dispatch(startSync())
    this.props.dispatch(startUpdatePosition())
  }

  onStarClick(id) {
    console.log("The star for campsite " + id + " has been clicked!")
  }

  render() {
    // If this application is running in fullscreen on mobile
    // then set class on top level div so that we can easily adjust layout
    // for this case
    let onStarClick = this.props.onStarClick;
    let position = this.props.position;
    let campsites = this.props.campsites;
    let parks = this.props.parks;

    let fullscreen = window.navigator.standalone
    return (
      <div id="app" className={fullscreen ? 'fullscreen' : null}>
        <Route exact path="/">
          <Redirect to="/campsites" />
        </Route>
        <Route exact path="/campsites" component={() => (<CampsiteIndexPage campsites={campsites} parks={parks} position={position}/>)}/>
        <Route path="/campsites/:id" component={({match}) => (<CampsiteDetailPage id={match.params.id} campsites={campsites} parks={parks} onStarClick={onStarClick}/>)} />
        <Route path="/parks/:id" component={({match}) => (<ParkDetailPage id={match.params.id} campsites={campsites} parks={parks} position={position}/>)}/>
        <Route path="/about" component={AboutPage} />
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
