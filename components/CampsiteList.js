import React from 'react';
import Campsite from './Campsite';
import data from '../data';
import { Link } from 'react-router';
import PositionRelationship from '../libs/PositionRelationship';

export default class CampsiteList extends React.Component {
  sortCampsitesArrayByDistance(campsites, position) {
    if (position == null) {
      // TODO: Sort campsites by name
    } else {
      // Add distance and bearing information
      var campsites = campsites.map(function(c) {
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
      var campsites = campsites.sort(function(a, b) {
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
    return campsites;
  }

  render() {
    var position = this.props.position;
    // Ugh. For the time being campsites is an array and parks is an object
    var campsitesArray = this.props.campsites;
    var parks = this.props.parks;
    let hidePark = this.props.hidePark

    let sortedCampsites = this.sortCampsitesArrayByDistance(campsitesArray, position)

    return (
      <ul className="list-group">
        {
          sortedCampsites.map(function(campsite) {
            return (
              <Link to={"/campsites/" + campsite.id} className="list-group-item" key={campsite.id}>
                <Campsite name={campsite.name} park={parks[campsite.park_id].shortName} distance={campsite.distance} bearing={campsite.bearing} hidePark={hidePark}/>
              </Link>
            )
          })
        }
      </ul>
    )
  }
}
