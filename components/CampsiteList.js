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

    // Sort campsites by distance
    var campsites = campsites.sort(function(a, b) {
      if (a.distance == undefined && b.distance == undefined) {
        return 0;
      }
      if (a.distance == undefined) {
        return 1;
      }
      if (b.distance == undefined) {
        return -1;
      }
      if (a.distance > b.distance) {
        return 1;
      }
      if (a.distance < b.distance) {
        return -1;
      }
      return 0;
    });

    return (
      <div className="campsite-list">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <h1 className="navbar-text">Camping near you</h1>
          </div>
        </nav>
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
      </div>
    )
  }
});
