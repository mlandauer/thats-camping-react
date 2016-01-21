import React from 'react';
import { connect } from 'react-redux'
import data from './../data';
import { addParks } from '../actions/ParksActions'
import { addCampsites } from '../actions/CampsitesActions'
import { updatePosition } from '../actions/PositionActions'

export default class App extends React.Component {
  componentWillMount() {
    this.props.dispatch(addParks(this.transformDataToParks(data)))
    this.props.dispatch(addCampsites(this.transformDataToCampsites(data)))
    this.startUpdateLocation();
  }

  startUpdateLocation() {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        this.props.dispatch(updatePosition(location.coords.latitude, location.coords.longitude))
      },
      (err) => {
        console.warn('Error getting location (' + err.code + '): ' + err.message);
      },
      {enableHighAccuracy: true});
  }

  render() {
    return React.cloneElement(this.props.children, {
      position: this.props.position,
      campsites: this.props.campsites,
      parks: this.props.parks
    });
  }

  transformDataToParks(data) {
    return data.parks.map((p) => {
      return {
        id: p.id,
        shortName: p.shortName,
        longName: p.longName,
        description: this.simpleFormat(p.description)
      };
    });
  }

  transformDataToCampsites(data) {
    return data.campsites.map((c) => {
      return {
        id: c.id,
        name: c.shortName,
        position: {
          lat: c.latitude,
          lng: c.longitude
        },
        description: this.simpleFormat(c.description),
        park_id: c.park,
        facilities: this.facilitiesFields(c),
        access: this.accessFields(c)
      }
    })
  }

  accessFields(campsite) {
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

  facilitiesFields(campsite) {
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

  simpleFormat(str) {
    str = str.replace(/\r\n?/, "\n");
    str = jQuery.trim(str);
    if (str.length > 0) {
      str = str.replace(/\n\n+/g, '</p><p>');
      str = str.replace(/\n/g, '<br />');
      str = '<p>' + str + '</p>';
    }
    return str;
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return state
}
// Wrap the component to inject dispatch and state into it
export default connect(select)(App)
