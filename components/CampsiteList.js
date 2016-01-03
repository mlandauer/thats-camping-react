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

    return (
      <ul className="list-group">
        {
          campsites.map(function(campsite) {
            var distance = PositionRelationship.distanceInMetres(campsite.position, userPosition);
            var bearing = PositionRelationship.bearingInDegrees(campsite.position, userPosition);
            return (
              <li className="list-group-item" key={campsite.id}>
                <Campsite name={campsite.name} park={campsite.park} distance={distance} bearing={bearing}/>
              </li>
            )
          })
        }
      </ul>
    )
  }
});
