import * as React from 'react';
import CampsiteList from './CampsiteList'
import Header from './Header'
import { Position, ParkOriginal, Access, Facilities, Campsite } from '../libs/types'

interface CampsiteIndexPageProps {
  position: Position;
  campsites: {[index: number]: Campsite};
}

export default class CampsiteIndexPage extends React.Component<CampsiteIndexPageProps, {}> {
  render() {
    var position = this.props.position;
    var campsites = this.props.campsites;

    // First make an array of the campsites we want to show here
    let campsitesArray = [];
    for (var id in campsites) {
      campsitesArray.push(campsites[id])
    }

    return (
      <div className="campsite-list">
        <Header title="Camping near you" hideBackButton={true} showAboutButton={true}/>
        <div className="content">
          <CampsiteList campsites={campsitesArray} position={position} />
        </div>
      </div>
    )
  }
}
