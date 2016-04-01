// Transform the data in data.json into a format that is closer to what we
// need so that there is less processing required in the app itself

var data = require('./data.json');

data.campsites = data.campsites.map(function(campsite) {
  var lat = campsite.latitude
  var lng = campsite.longitude
  // Some of the position data in data.json is accidently included as strings
  // Let's fix this here
  if (typeof(lat) == "string") {
    lat = Number(lat)
  }
  if (typeof(lng) == "string") {
    lng = Number(lng)
  }

  var barbecues = campsite.barbecues
  if (barbecues == "wood_supplied" || barbecues == "wood_bring_your_own") {
    barbecues = "wood"
  }

  return ({
    id: campsite.id,
    park_id: campsite.park,
    // TODO: Derive shortName from longName at runtime
    shortName: campsite.shortName,
    longName: campsite.longName,
    description: campsite.description,
    position: { lat: lat, lng: lng },
    facilities: {
      toilets: campsite.toilets,
      picnicTables: campsite.picnicTables,
      barbecues: barbecues,
      showers: campsite.showers,
      drinkingWater: campsite.drinkingWater
    },
    access: {
      caravans: campsite.caravans,
      trailers: campsite.trailers,
      car: campsite.car
    }
  });
});

data.parks = data.parks.map(function(park) {
  return ({
    id: park.id,
    // TODO Derive shortName at runtime from longName
    shortName: park.shortName,
    longName: park.longName,
    description: park.description,
    campsite_ids: park.campsites
  });
});

var fs = require('fs');
fs.writeFileSync('data2.json', JSON.stringify(data));
