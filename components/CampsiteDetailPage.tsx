import * as React from 'react'
import Header from './Header'
import CampsiteDetail from './CampsiteDetail';
import shortenName from '../libs/shortenName'
import { Access, Facilities, Position } from '../libs/types'

interface Campsite {
  id: string;
  starred: boolean;
  description: string;
  park_id: number;
  name: string;
  park: Park;
  access: Access;
  facilities: Facilities;
  position: Position;
}

interface Park {
  id: number;
  name: string;
}

interface CampsiteDetailPageProps {
  campsites: Campsite[];
  id: number;
  park: Park;
  parks: Park[];
  onStarClick: (id: string) => boolean;
}

class CampsiteDetailPage extends React.Component<CampsiteDetailPageProps, {}> {
  render() {
    let campsite = this.props.campsites[this.props.id]
    if (campsite == undefined) {
      return (<div></div>)
    }
    let park = this.props.parks[campsite.park_id]
    campsite = Object.assign({}, campsite, {park: park})
    return (
      <div className="campsite-detail-page">
        <Header title={shortenName(campsite.name)} hideBackButton={false} showAboutButton={false}/>
        <div className="content">
          <div className="container">
            <CampsiteDetail campsite={campsite} onStarClick={this.props.onStarClick}/>
          </div>
        </div>
      </div>
    )
  }
}

export default CampsiteDetailPage
