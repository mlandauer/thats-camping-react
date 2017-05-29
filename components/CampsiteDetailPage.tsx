import * as React from 'react'
import Header from './Header'
import CampsiteDetail from './CampsiteDetail';
import shortenName from '../libs/shortenName'
import { Access, Facilities, Position, Campsite } from '../libs/types'

interface CampsiteDetailPageProps {
  campsites: {[index: number]: Campsite};
  id: number;
  onStarClick: (id: number) => boolean;
}

class CampsiteDetailPage extends React.Component<CampsiteDetailPageProps, {}> {
  render() {
    let campsite = this.props.campsites[this.props.id]
    if (campsite == undefined) {
      return (<div></div>)
    }
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
