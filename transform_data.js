// Transform the data in data.json into a format that is closer to what we
// need so that there is less processing required in the app itself
var shortenName = require("./libs/shortenName")
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

  if (shortenName(campsite.longName) != campsite.shortName) {
    console.log("WARNING:", campsite.longName, "should be shortened to", campsite.shortName)
  }

  return ({
    id: campsite.id,
    park_id: campsite.park,
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
  if (shortenName(park.longName) != park.shortName) {
    console.log("WARNING:", park.longName, "should be shortened to", park.shortName)
  }

  return ({
    id: park.id,
    longName: park.longName,
    description: park.description,
    campsite_ids: park.campsites
  });
});

var fs = require('fs');
fs.writeFileSync('data_simplified.json', JSON.stringify(data, null, 2));
