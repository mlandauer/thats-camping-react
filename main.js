// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var createBrowserHistory = require('history/lib/createBrowserHistory');
module.exports = browserHistory = createBrowserHistory();

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

var accessFields = function(campsite) {
  var have = [];
  var notHave = [];

  var caravans = campsite.caravans;
  var trailers = campsite.trailers;
  var car = campsite.car;

  if (caravans) {
    have.push("caravans");
  }
  else {
    notHave.push("caravans");
  }
  if (trailers) {
    have.push("trailers");
  }
  else {
    notHave.push("trailers");
  }
  if (car) {
    have.push("car camping");
  }
  else {
    notHave.push("car camping");
  }

  return {have: have, notHave: notHave};
}

var facilitiesFields = function(campsite) {
  var have = [];
  var notHave = [];

  var toilets = campsite.toilets;
  var picnicTables = campsite.picnicTables;
  var barbecues = campsite.barbecues;
  var showers = campsite.showers;
  var drinkingWater = campsite.drinkingWater;

  if (toilets == "flush") {
    have.push("flush toilets");
  }
  else if (toilets == "non_flush") {
    have.push("non-flush toilets");
  }
  else if (toilets == "none") {
    notHave.push("toilets");
  }

  if (picnicTables) {
    have.push("picnic tables");
  }
  else {
    notHave.push("picnic tables");
  }

  // TODO: show whether you need to bring your own firewood elsewhere
  // Like "You will need to bring firewood (if you want to use the wood BBQs) and drinking water"
  if(barbecues == "wood" || barbecues == "wood_supplied" || barbecues == "wood_bring_your_own") {
    have.push("wood BBQs");
  }
  else if (barbecues == "gas_electric") {
    have.push("gas/electric BBQs");
  }
  else if (barbecues == "none") {
    notHave.push("BBQs");
  }

  if (showers == "hot") {
    have.push("hot showers");
  }
  else if (showers == "cold") {
    have.push("cold showers");
  }
  else if (showers == "none") {
    notHave.push("showers");
  }

  if (drinkingWater) {
    have.push("drinking water");
  }
  else {
    notHave.push("drinking water");
  }
  return {have: have, notHave: notHave};
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
    park: parks[c.park],
    facilities: facilitiesFields(c),
    access: accessFields(c)
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
