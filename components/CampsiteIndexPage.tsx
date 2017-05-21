import * as React from 'react';
import CampsiteList from './CampsiteList'
import Header from './Header'
import { Position, Park, Access, Facilities } from '../libs/types'

// Note that this is currently a little bit different than the Campsite type
// defined in libs/types
interface Campsite {
  id: number;
  name: string;
  description: string;
  access: Access;
  facilities: Facilities;
  starred: boolean;
  position: Position;
  park_id: number;
}

interface CampsiteIndexPageProps {
  position: Position;
  campsites: Campsite[];
  parks: Park[];
}

export default class CampsiteIndexPage extends React.Component<CampsiteIndexPageProps, {}> {
  render() {
    var position = this.props.position;
    var campsites = this.props.campsites;
    var parks = this.props.parks;

    // First make an array of the campsites we want to show here
    let campsitesArray = [];
    for (var id in campsites) {
      let campsite = campsites[id]
      let campsite2 = Object.assign({}, campsite, {park: parks[campsite.park_id]})
      campsitesArray.push(campsite2)
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
