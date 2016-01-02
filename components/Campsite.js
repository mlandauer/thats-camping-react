var React = require('react');

var toRad = function(deg) {
  return (deg * Math.PI / 180);
}

var toDeg = function(rad) {
  return (rad * 180 / Math.PI);
}

// Distance in metres between two positions given as lat longs
var distanceInMetres = function(position1, position2) {
  var R = 6371000;
  var dLat = toRad(position2.lat - position1.lat);
  var dLon = toRad(position2.lng - position1.lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(position1.lat)) * Math.cos(toRad(position2.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};

module.exports = Campsite = React.createClass({
  position: function() {
    return ({
      lat: this.props.latitude,
      lng: this.props.longitude
    });
  },

  userPosition: function() {
    return ({
      lat: this.props.currentLatitude,
      lng: this.props.currentLongitude
    });
  },

  render: function() {
    console.log("distanceInMetres", distanceInMetres(this.userPosition(), this.position()));
    return (
      <div className="campsite">
        <div className="pull-right distance">{this.props.distance} {this.props.bearing}</div>
        <div className="name">{this.props.name}</div>
        <div className="park">{this.props.park}</div>
      </div>
    );
  }
});
