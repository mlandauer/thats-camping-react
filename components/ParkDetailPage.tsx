import * as React from 'react'
import ParkDetail from './ParkDetail'
import Header from './Header'
import shortenName from '../libs/shortenName'
import { Position, Campsite } from '../libs/types'

interface Park {
  id: number;
  name: string;
  description: string;
  campsite_ids: number[];
}

interface ParkDetailPageProps {
  id: number;
  campsites: Campsite[];
  parks: Park[];
  position: Position;
}

export default class ParkDetailPage extends React.Component<ParkDetailPageProps, {}> {
  render() {
    // Temporary workaround for the fact that parks and campsites do not get
    // update atomically. Only a problem when this page is loaded as the first page
    // TODO Fix this monstrosity
    if (Object.keys(this.props.parks).length == 0 || Object.keys(this.props.campsites).length == 0) {
      return (<div></div>)
    }
    let park = this.props.parks[this.props.id]
    let campsites = park.campsite_ids.map((campsite_id) => {
      return this.props.campsites[campsite_id]
    })
    let park2 = Object.assign({}, park, {campsites: campsites})

    return (
      <div className="park-detail-page">
        <Header title={shortenName(park2.name)} hideBackButton={false} showAboutButton={false}/>
        <div className="content">
          <ParkDetail park={park2} position={this.props.position}/>
        </div>
      </div>
    )
  }
}
