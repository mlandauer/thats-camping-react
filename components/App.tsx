import * as React from 'react';
import { connect, Dispatch } from 'react-redux'
import { startSync } from '../actions/CampsitesActions'
import { startUpdatePosition } from '../actions/PositionActions'
import { toggleStarredCampsite } from '../actions/StarredActions'
import CampsiteIndexPage from './CampsiteIndexPage';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import AboutPage from './AboutPage'
import CampsiteDetailPage from './CampsiteDetailPage';
import { State } from '../reducers/index'
import { Position, CampsiteWithStarred } from '../libs/types'

interface AppAction {

}

interface AppProps {
  dispatch: (action: AppAction) => void;
  onStarClick: (id: number) => boolean;
  position: Position;
  campsites: {[index: number]: CampsiteWithStarred};
}

// Doing this to workaround that Navigator type doesn't seem to have
// standalone on it which is used later on
interface ExtendedNavigator extends Navigator {
  standalone: boolean;
}

interface ExtendedWindow extends Window {
  navigator: ExtendedNavigator;
}

declare var window: ExtendedWindow;

class App extends React.Component<AppProps, any> {
  componentWillMount() {
    this.props.dispatch(startSync())
    this.props.dispatch(startUpdatePosition())
  }

  onStarClick(id: number) {
    console.log("The star for campsite " + id + " has been clicked!")
  }

  render() {
    // If this application is running in fullscreen on mobile
    // then set class on top level div so that we can easily adjust layout
    // for this case
    let onStarClick = this.props.onStarClick;
    let position = this.props.position;
    let campsites = this.props.campsites;

    let fullscreen = window.navigator.standalone

    return (
      <HashRouter>
        <div id="app" className={fullscreen ? 'fullscreen' : undefined}>
          <Route exact path="/" render={() => (
            <Redirect to="/campsites" />
          )} />
          <Route exact path="/campsites" render={() => (<CampsiteIndexPage campsites={campsites} position={position}/>)}/>
          <Route path="/campsites/:id" render={({match}) => (<CampsiteDetailPage id={match.params.id} campsites={campsites} onStarClick={onStarClick}/>)} />
          <Route path="/about" render={({match}) => (<AboutPage/>)} />
        </div>
      </HashRouter>
    )
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function mapStateToProps(state: State) {
  // Put the star state directly into each campsite object to make things easier
  // elsewhere
  // Ugh. This is all fairly horrible
  let new_campsites : {[index:number]: CampsiteWithStarred} = {}
  for (var id in state.campsites) {
    // Don't want to use strict equality (with indexOf) as a workaround
    let i = state.starred.findIndex((v) => {return v.toString() == id})
    let starred = i != -1
    new_campsites[id] = Object.assign({}, state.campsites[id], {starred: starred})
  }
  return {
    position: state.position,
    campsites: new_campsites
  }
}

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
  return {
    dispatch,
    onStarClick: (id: number) => {
      dispatch(toggleStarredCampsite(id))
    }
  }
}

// Wrap the component to inject dispatch and state into it
export const WrappedApp = connect(mapStateToProps, mapDispatchToProps)(App)
