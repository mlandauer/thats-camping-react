var React = require('react');
var CampsiteList = require('./CampsiteList');
var CampsiteDetailPage = require('./CampsiteDetailPage');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

module.exports = App = React.createClass({
  render: function() {
    return (
      <Router>
        <Route path="/" component={CampsiteList} />
        <Route path="/campsites/:id" component={CampsiteDetailPage} />
      </Router>
    )
  }
});
