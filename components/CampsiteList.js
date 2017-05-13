import React from 'react';
import PropTypes from 'prop-types';
import CampsiteListItem from './CampsiteListItem';
import { Link } from 'react-router-dom';
import PositionRelationship from '../libs/PositionRelationship';
import shortenName from '../libs/shortenName'

export default class CampsiteList extends React.Component {
  sortCampsitesArrayByDistance(campsites, position) {
    if (position == null) {
      // TODO: Sort campsites by name
    } else {
      // Add distance and bearing information
      var campsites = campsites.map(function(c) {
        let positions = new PositionRelationship(c.position, position)
        return Object.assign({}, c, {
          distance: positions.distanceInMetres(),
          bearing: positions.bearingInDegrees()})
      });

      // Sort campsites by distance
      var campsites = campsites.sort(function(a, b) {
        if (a.starred == b.starred) {
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
        }
        else if (a.starred && !b.starred) {
          return -1;
        }
        else {
          return 1;
        }
      });
    }
    return campsites;
  }

  render() {
    var position = this.props.position;
    var campsitesArray = this.props.campsites;
    var parks = this.props.parks;

    let sortedCampsites = this.sortCampsitesArrayByDistance(campsitesArray, position)
    return (
      <ul className="list-group">
        {
          sortedCampsites.map(function(campsite) {
            let parkName = campsite.park == undefined ? "" : shortenName(campsite.park.name)
            return (
              <Link to={"/campsites/" + campsite.id} className="list-group-item" key={campsite.id}>
                <CampsiteListItem campsiteName={shortenName(campsite.name)} parkName={parkName} distance={campsite.distance} bearing={campsite.bearing} starred={campsite.starred}/>
              </Link>
            )
          })
        }
      </ul>
    )
  }
}


CampsiteList.propTypes = {
  campsites: PropTypes.arrayOf(PropTypes.object).isRequired,
  position: PropTypes.object
}
