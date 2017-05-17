import * as React from 'react';
import CampsiteListItem from './CampsiteListItem';
import { Link } from 'react-router-dom';
import PositionRelationship from '../libs/PositionRelationship';
import shortenName from '../libs/shortenName'
import { Position, Park, Campsite } from '../libs/types'

interface CampsiteWithDistanceAndBearing extends Campsite {
  distance: number | undefined;
  bearing: number | undefined;
}

interface CampsiteListProps {
  campsites: Campsite[];
  position: Position;
}

export default class CampsiteList extends React.Component<CampsiteListProps, {}> {
  sortCampsitesArrayByDistance(campsites: Campsite[], position: Position | null): CampsiteWithDistanceAndBearing[] {
    if (position == null) {
      // TODO: Sort campsites by name
      var campsites2 = campsites.map(function(c): CampsiteWithDistanceAndBearing {
        return Object.assign({}, c, {
          distance: undefined,
          bearing: undefined})
      });
    } else {
      // Add distance and bearing information
      var campsites2 = campsites.map(function(c): CampsiteWithDistanceAndBearing {
        let positions = new PositionRelationship(c.position, position)
        return Object.assign({}, c, {
          distance: positions.distanceInMetres(),
          bearing: positions.bearingInDegrees()})
      });

      // Sort campsites by distance
      var campsites2 = campsites2.sort(function(a: CampsiteWithDistanceAndBearing, b: CampsiteWithDistanceAndBearing) {
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
    return campsites2;
  }

  render() {
    var position = this.props.position;
    var campsitesArray = this.props.campsites;

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
