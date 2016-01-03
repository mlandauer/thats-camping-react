var toRad = function(deg) {
  return (deg * Math.PI / 180);
}

var toDeg = function(rad) {
  return (rad * 180 / Math.PI);
}

module.exports = PositionRelationship = {
  // Distance in metres between two positions given as lat longs
  distanceInMetres: function(position1, position2) {
    var R = 6371000;
    var dLat = toRad(position2.lat - position1.lat);
    var dLon = toRad(position2.lng - position1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(position1.lat)) * Math.cos(toRad(position2.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  },

  bearingInDegrees: function(position1, position2) {
    var lon2 = toRad(position2.lng);
    var lat2 = toRad(position2.lat);
    var lon1 = toRad(position1.lng);
    var lat1 = toRad(position1.lat);
    var dLon = lon1 - lon2;
    var y = Math.sin(dLon) * Math.cos(lat1);
    var x = Math.cos(lat2) * Math.sin(lat1) - Math.sin(lat2) * Math.cos(lat1) * Math.cos(dLon);
    // This is a number between 0 and 360
    var bearing = (toDeg(Math.atan2(y, x)) + 360.0) % 360;
    return bearing;
  }
}
