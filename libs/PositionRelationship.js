var toRad = function(deg) {
  return (deg * Math.PI / 180);
}

var toDeg = function(rad) {
  return (rad * 180 / Math.PI);
}

export default class PositionRelationship {
  constructor(position1, position2) {
    this.position1 = position1
    this.position2 = position2
  }

  // Distance in metres between two positions given as lat longs
  distanceInMetres() {
    if (this.position1.lat == undefined || this.position1.lng == undefined || this.position2.lat == undefined || this.position2.lng == undefined) {
      return undefined;
    }

    var R = 6371000;
    var dLat = toRad(this.position2.lat - this.position1.lat);
    var dLon = toRad(this.position2.lng - this.position1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(this.position1.lat)) * Math.cos(toRad(this.position2.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  bearingInDegrees() {
    if (this.position1.lat == undefined || this.position1.lng == undefined || this.position2.lat == undefined || this.position2.lng == undefined) {
      return undefined;
    }

    var lon2 = toRad(this.position2.lng);
    var lat2 = toRad(this.position2.lat);
    var lon1 = toRad(this.position1.lng);
    var lat1 = toRad(this.position1.lat);
    var dLon = lon1 - lon2;
    var y = Math.sin(dLon) * Math.cos(lat1);
    var x = Math.cos(lat2) * Math.sin(lat1) - Math.sin(lat2) * Math.cos(lat1) * Math.cos(dLon);
    // This is a number between 0 and 360
    var bearing = (toDeg(Math.atan2(y, x)) + 360.0) % 360;
    return bearing;
  }
}
