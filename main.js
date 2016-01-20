// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Redirect = require('react-router').Redirect;
var createBrowserHistory = require('history/lib/createBrowserHistory');
module.exports = browserHistory = createBrowserHistory();

var App = require('./components/App');
var CampsiteList = require('./components/CampsiteList');
var CampsiteDetailPage = require('./components/CampsiteDetailPage');

ReactDOM.render(
  <Router history={browserHistory}>
    <Redirect from="/" to="/campsites" />
    <Route path="/campsites" component={App}>
      <IndexRoute component={CampsiteList} />
      <Route path=":id" component={CampsiteDetailPage} />
    </Route>
  </Router>,
  document.getElementById('root')
);
