// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var createBrowserHistory = require('history/lib/createBrowserHistory');
var browserHistory = createBrowserHistory();

var CampsiteList = require('./components/CampsiteList');
var CampsiteDetailPage = require('./components/CampsiteDetailPage');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={CampsiteList} />
    <Route path="/campsites/:id" component={CampsiteDetailPage} />
  </Router>,
  document.getElementById('root')
);
