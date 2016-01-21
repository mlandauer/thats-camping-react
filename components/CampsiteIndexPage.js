import React from 'react';
import Campsite from './Campsite';
import data from '../data';
import { Link } from 'react-router';
import PositionRelationship from '../libs/PositionRelationship';

export default class CampsiteIndexPage extends React.Component {
  campsitesSortedByDistance(campsites, position) {
    // Munge information in data into the right form
    var campsites2 = [];
    for (var id in campsites) {
      campsites2.push(campsites[id]);
    }

    if (position == null) {
      // TODO: Sort campsites by name
    } else {
      // Add distance and bearing information
      var campsites2 = campsites2.map(function(c) {
        var distance = PositionRelationship.distanceInMetres(c.position, position);
        var bearing = PositionRelationship.bearingInDegrees(c.position, position);
        // TODO Do some kind of concat instead
        return {
          name: c.name,
          position: c.position,
          park_id: c.park_id,
          id: c.id,
          distance: distance,
          bearing: bearing
        };
      });

      // Sort campsites by distance
      var campsites2 = campsites2.sort(function(a, b) {
        if (a.distance == undefined && b.distance == undefined) {
          return a.name.localeCompare(b.name);
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
    }
    return campsites2;
  }

  render() {
    var position = this.props.position;
    var campsites = this.props.campsites;
    var parks = this.props.parks;

    let campsites2 = this.campsitesSortedByDistance(campsites, position)

    return (
      <div className="campsite-list">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <h1>Camping near you</h1>
          </div>
        </nav>
        <ul className="list-group">
          {
            campsites2.map(function(campsite) {
              return (
                <Link to={"/campsites/" + campsite.id} className="list-group-item" key={campsite.id}>
                  <Campsite name={campsite.name} park={parks[campsite.park_id].shortName} distance={campsite.distance} bearing={campsite.bearing}/>
                </Link>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
