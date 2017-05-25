import * as React from 'react'
import Header from './Header'
import CampsiteDetail from './CampsiteDetail';
import shortenName from '../libs/shortenName'
import { Access, Facilities, Position, CampsiteWithStarred } from '../libs/types'

interface Park {
  id: number;
  description: string;
  name: string;
  campsite_ids: number[];
}

interface CampsiteDetailPageProps {
  campsites: CampsiteWithStarred[];
  id: number;
  parks: Park[];
  onStarClick: (id: number) => boolean;
}

class CampsiteDetailPage extends React.Component<CampsiteDetailPageProps, {}> {
  render() {
    let campsite = this.props.campsites[this.props.id]
    if (campsite == undefined) {
      return (<div></div>)
    }
    let park = this.props.parks[campsite.park_id]
    let campsite2 = Object.assign({}, campsite, {park: park})
    return (
      <div className="campsite-detail-page">
        <Header title={shortenName(campsite.name)} hideBackButton={false} showAboutButton={false}/>
        <div className="content">
          <div className="container">
            <CampsiteDetail campsite={campsite2} onStarClick={this.props.onStarClick}/>
          </div>
        </div>
      </div>
    )
  }
}

export default CampsiteDetailPage
