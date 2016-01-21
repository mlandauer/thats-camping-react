// main.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import createBrowserHistory from 'history/lib/createBrowserHistory';
var browserHistory = createBrowserHistory();
module.exports = browserHistory;

import App from './components/App';
import CampsiteList from './components/CampsiteList';
import CampsiteDetailPage from './components/CampsiteDetailPage';
import reducer from './reducers'

let store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Redirect from="/" to="/campsites" />
      <Route path="/campsites" component={App}>
        <IndexRoute component={CampsiteList} />
        <Route path=":id" component={CampsiteDetailPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
