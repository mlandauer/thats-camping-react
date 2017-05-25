import * as React from 'react';
import simpleFormat from '../libs/simpleFormat'
import CampsiteList from './CampsiteList'
import { Position, Campsite, Park } from '../libs/types'

interface ParkDetailProps {
  position: Position;
  park: Park;
}

export default class ParkDetail extends React.Component<ParkDetailProps, {}> {
  getDescription() {
    return {__html: simpleFormat(this.props.park.description)};
  }

  render() {
    return (
      <div className="park-detail">
        <div className="container">
          <h2>{this.props.park.name}</h2>
          <div dangerouslySetInnerHTML={this.getDescription()}/>
        </div>
        <div className="park-campsite-list">
          <CampsiteList campsites={this.props.park.campsites} position={this.props.position} />
        </div>
      </div>
    )
  }
}
