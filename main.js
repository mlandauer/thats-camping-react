// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var createBrowserHistory = require('history/lib/createBrowserHistory');
var browserHistory = createBrowserHistory();

var CampsiteList = require('./components/CampsiteList');
var CampsiteDetailPage = require('./components/CampsiteDetailPage');

// Munge information in data into the right form and make it quick to
// look up by id
module.exports = campsites = {};
data.campsites.forEach(function(c) {
  var park = findParkById(c.park, data.parks);
  campsites[c.id] = {
    id: c.id,
    name: c.shortName,
    position: {
      lat: c.latitude,
      lng: c.longitude
    },
    // TODO Convert line breaks into paragraphs
    description: c.description,
    park: {
      shortName: park.shortName,
      longName: park.longName
    }
  };
});

//console.log("campsites", campsites);

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={CampsiteList} />
    <Route path="/campsites/:id" component={CampsiteDetailPage} />
  </Router>,
  document.getElementById('root')
);
