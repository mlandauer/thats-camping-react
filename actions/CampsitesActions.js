import fetch from 'isomorphic-fetch'
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
      description: p.description,
      campsite_ids: p.campsites
    };
  });
}

function transformDataToCampsites(data) {
  return data.campsites.map((c) => {
    var lat = c.latitude
    var lng = c.longitude
    // Some of the position data in data.json is accidently included as strings
    // Let's fix this here
    if (typeof(lat) == "string") {
      lat = Number(lat)
    }
    if (typeof(lng) == "string") {
      lng = Number(lng)
    }

    var barbecues = c.barbecues
    if (barbecues == "wood_supplied" || barbecues == "wood_bring_your_own") {
      barbecues = "wood"
    }

    return {
      id: c.id,
      shortName: c.shortName,
      longName: c.longName,
      position: { lat: lat, lng: lng },
      description: c.description,
      park_id: c.park,
      facilities: {
        toilets: c.toilets,
        picnicTables: c.picnicTables,
        barbecues: barbecues,
        showers: c.showers,
        drinkingWater: c.drinkingWater
      },
      access: {
        caravans: c.caravans,
        trailers: c.trailers,
        car: c.car
      }
    }
  })
}
