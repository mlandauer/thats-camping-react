var React = require('react');
var Campsite = require('./Campsite');
var data = require('../data');

var findParkById = function(id, parks) {
  return parks.find(function(p) {
    return (p.id == id);
  });
};

module.exports = CampsiteList = React.createClass({
  render: function() {
    var userPosition = {lat: -33.7125, lng: 150.3119};

    // Munge information in data into the right form
    var campsites = data.campsites.map(function(c) {
      return ({
        name: c.shortName,
        position: {
          lat: c.latitude,
          lng: c.longitude
        },
        park: findParkById(c.park, data.parks).shortName,
        id: c.id
      });
    });

    // Add distance and bearing information
    var campsites = campsites.map(function(c) {
      var distance = PositionRelationship.distanceInMetres(c.position, userPosition);
      var bearing = PositionRelationship.bearingInDegrees(c.position, userPosition);
      // TODO Do some kind of concat instead
      return {
        name: c.name,
        position: c.position,
        park: c.park,
        id: c.id,
        distance: distance,
        bearing: bearing
      };
    });

    return (
      <ul className="list-group">
        {
          campsites.map(function(campsite) {
            return (
              <li className="list-group-item" key={campsite.id}>
                <Campsite name={campsite.name} park={campsite.park} distance={campsite.distance} bearing={campsite.bearing}/>
              </li>
            )
          })
        }
      </ul>
    )
  }
});
