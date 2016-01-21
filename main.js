// main.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

global.jQuery = require('jquery');
require('bootstrap');

import createBrowserHistory from 'history/lib/createBrowserHistory';
var browserHistory = createBrowserHistory();
module.exports = browserHistory;

import App from './components/App';
import CampsiteList from './components/CampsiteList';
import CampsiteDetailPage from './components/CampsiteDetailPage';
import ParkDetailPage from './components/ParkDetailPage';
import reducer from './reducers'

let store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Redirect from="/" to="/campsites" />
      <Route path="/" component={App}>
        <Route path="/campsites">
          <IndexRoute component={CampsiteList} />
          <Route path=":id" component={CampsiteDetailPage} />
        </Route>
        <Route path="/parks">
          <Route path=":id" component={ParkDetailPage} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
