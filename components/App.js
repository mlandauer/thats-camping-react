var React = require('react');
var data = require('./../data');

var App = React.createClass({
  getInitialState: function() {
      return {
        userPosition: null,
        parks: this.transformDataToParks(data),
        campsites: this.transformDataToCampsites(data)
      };
  },

  componentWillMount: function() {
    this.updateLocation();
  },

  updateLocation: function() {
    navigator.geolocation.getCurrentPosition(this.geoLocation, this.geoError,
      {enableHighAccuracy: true});
  },

  geoLocation: function(location){
    this.setState({userPosition: {
      lat: location.coords.latitude,
      lng: location.coords.longitude
    }});
  },

  geoError: function(err) {
    console.warn('Error getting location (' + err.code + '): ' + err.message);
  },

  render: function() {
    return React.cloneElement(this.props.children, {
      userPosition: this.state.userPosition,
      campsites: this.state.campsites,
      parks: this.state.parks
    });
  },

  // Munge information in data into the right form and make it quick to
  // look up by id
  transformDataToParks: function(data) {
    var parks = {};
    data.parks.forEach(function(p) {
      parks[p.id] = {
        shortName: p.shortName,
        longName: p.longName
      };
    });
    return parks;
  },

  transformDataToCampsites: function(data) {
    var campsites = {};
    data.campsites.forEach((c) => {
      campsites[c.id] = {
        id: c.id,
        name: c.shortName,
        position: {
          lat: c.latitude,
          lng: c.longitude
        },
        // TODO Convert line breaks into paragraphs
        description: this.simpleFormat(c.description),
        park_id: c.park,
        facilities: this.facilitiesFields(c),
        access: this.accessFields(c)
      };
    });
    return campsites;
  },

  accessFields: function(campsite) {
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
  },

  facilitiesFields: function(campsite) {
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
  },

  simpleFormat: function(str) {
    str = str.replace(/\r\n?/, "\n");
    str = $.trim(str);
    if (str.length > 0) {
      str = str.replace(/\n\n+/g, '</p><p>');
      str = str.replace(/\n/g, '<br />');
      str = '<p>' + str + '</p>';
    }
    return str;
  }
});

module.exports = App;
