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
// Opt-out of persistent state, not recommended.
var history = createHistory({
  queryKey: false
});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore)

let store = createStoreWithMiddleware(reducer)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
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
