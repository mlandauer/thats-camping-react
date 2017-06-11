import * as React from 'react';
import { Star } from './Star'
import * as TextFormatter from '../libs/TextFormatter'

interface Props {
  campsiteName: string;
  parkName: string;
  distance: number | undefined;
  bearing: number | undefined;
  starred: boolean;
}

export default class CampsiteListItem extends React.Component<Props, {}> {
  render() {
    return (
      <div className="campsite">
        <Star starred={this.props.starred}/>
        <div className="pull-right distance">{TextFormatter.distanceText(this.props.distance)} {TextFormatter.bearingText(this.props.bearing)}</div>
        <div className="name">{this.props.campsiteName}</div>
        <div className="park">{this.props.parkName}</div>
      </div>
    );
  }
}
