// main.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

global.jQuery = require('jquery');

// Uncomment the bits of bootstrap javascript belowwhen we need them
//
// require('bootstrap/js/transition.js')
// require('bootstrap/js/alert.js')
// require('bootstrap/js/button.js')
// require('bootstrap/js/carousel.js')
// require('bootstrap/js/collapse.js')
// require('bootstrap/js/dropdown.js')
// require('bootstrap/js/modal.js')
// require('bootstrap/js/tooltip.js')
// require('bootstrap/js/popover.js')
// require('bootstrap/js/scrollspy.js')
// require('bootstrap/js/tab.js')
// require('bootstrap/js/affix.js')

import App from './components/App';
import CampsiteIndexPage from './components/CampsiteIndexPage';
import CampsiteDetailPage from './components/CampsiteDetailPage';
import ParkDetailPage from './components/ParkDetailPage';
import AboutPage from './components/AboutPage'
import reducer from './reducers'

import attachFastClick from 'fastclick'
attachFastClick(document.body)

import createHistory from 'history/lib/createHashHistory'
import useScroll from 'scroll-behavior/lib/useStandardScroll'

// Opt-out of persistent state, not recommended.
const historyWithScroll = useScroll(createHistory)({queryKey: false})

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore)

let store = createStoreWithMiddleware(reducer)

// Check if a new cache is available on page load.
window.addEventListener('load', function(e) {

  window.applicationCache.addEventListener('updateready', function(e) {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
      // Browser downloaded a new app cache.
      if (confirm('A new version of this site is available. Load it?')) {
        window.location.reload();
      }
    } else {
      // Manifest didn't changed. Nothing new to server.
    }
  }, false);

}, false);

ReactDOM.render(
  <Provider store={store}>
    <Router history={historyWithScroll}>
      <Redirect from="/" to="/campsites" />
      <Route path="/" component={App}>
        <Route path="/campsites">
          <IndexRoute component={CampsiteIndexPage} />
          <Route path=":id" component={CampsiteDetailPage} />
        </Route>
        <Route path="/parks">
          <Route path=":id" component={ParkDetailPage} />
        </Route>
        <Route path="/about" component={AboutPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
