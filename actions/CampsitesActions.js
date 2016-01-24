import * as types from '../constants/ActionTypes'
import { addParks } from './ParksActions'

export function addCampsites(campsites) {
  return {
    type: types.ADD_CAMPSITES,
    campsites: campsites
  }
}

export function startSync() {
  return dispatch => {
    // TODO Also dispatch something immediately to let the user know something is going on
    fetch('/api/data.json')
      .then(response => response.json())
      .then(json => {
        dispatch(addParks(transformDataToParks(json)))
        dispatch(addCampsites(transformDataToCampsites(json)))
      })
  }
}

function transformDataToParks(data) {
  return data.parks.map((p) => {
    return {
      id: p.id,
      shortName: p.shortName,
      longName: p.longName,
      description: simpleFormat(p.description),
      campsite_ids: p.campsites
    };
  });
}

function transformDataToCampsites(data) {
  return data.campsites.map((c) => {
    return {
      id: c.id,
      shortName: c.shortName,
      position: {
        lat: c.latitude,
        lng: c.longitude
      },
      description: simpleFormat(c.description),
      park_id: c.park,
      facilities: facilitiesFields(c),
      access: accessFields(c)
    }
  })
}

function simpleFormat(str) {
  str = str.replace(/\r\n?/, "\n");
  str = jQuery.trim(str);
  if (str.length > 0) {
    str = str.replace(/\n\n+/g, '</p><p>');
    str = str.replace(/\n/g, '<br />');
    str = '<p>' + str + '</p>';
  }
  return str;
}

function accessFields(campsite) {
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

function facilitiesFields(campsite) {
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
