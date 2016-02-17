import React, { PropTypes } from 'react';
import CampsiteListItem from './CampsiteListItem';
import { Link } from 'react-router';
import PositionRelationship from '../libs/PositionRelationship';

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
        if (a.distance == undefined && b.distance == undefined) {
          return a.shortName.localeCompare(b.shortName);
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
    var campsitesArray = this.props.campsites;
    var parks = this.props.parks;

    let sortedCampsites = this.sortCampsitesArrayByDistance(campsitesArray, position)
    return (
      <ul className="list-group">
        {
          sortedCampsites.map(function(campsite) {
            let parkName = campsite.park == undefined ? "" : campsite.park.shortName
            return (
              <Link to={"/campsites/" + campsite.id} className="list-group-item" key={campsite.id}>
                <CampsiteListItem campsiteName={campsite.shortName} parkName={parkName} distance={campsite.distance} bearing={campsite.bearing} />
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
