// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var createBrowserHistory = require('history/lib/createBrowserHistory');
var browserHistory = createBrowserHistory();

var CampsiteList = require('./components/CampsiteList');
var CampsiteDetailPage = require('./components/CampsiteDetailPage');

var simpleFormat = function(str) {
  str = str.replace(/\r\n?/, "\n");
  str = $.trim(str);
  if (str.length > 0) {
    str = str.replace(/\n\n+/g, '</p><p>');
    str = str.replace(/\n/g, '<br />');
    str = '<p>' + str + '</p>';
  }
  return str;
}

// Munge information in data into the right form and make it quick to
// look up by id
var parks = {};
data.parks.forEach(function(p) {
  parks[p.id] = {
    shortName: p.shortName,
    longName: p.longName
  };
});

module.exports = campsites = {};
data.campsites.forEach(function(c) {
  campsites[c.id] = {
    id: c.id,
    name: c.shortName,
    position: {
      lat: c.latitude,
      lng: c.longitude
    },
    // TODO Convert line breaks into paragraphs
    description: simpleFormat(c.description),
    park: parks[c.park]
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
