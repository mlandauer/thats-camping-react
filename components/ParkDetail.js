import React, { PropTypes } from 'react';
import simpleFormat from '../libs/simpleFormat'
import CampsiteList from './CampsiteList'

export default class ParkDetail extends React.Component {
  getDescription() {
    return {__html: simpleFormat(this.props.park.description)};
  }

  render() {
    return (
      <div className="park-detail">
        <div className="container">
          <h2>{this.props.park.longName}</h2>
          <div dangerouslySetInnerHTML={this.getDescription()}/>
        </div>
        <div className="park-campsite-list">
          <CampsiteList campsites={this.props.park.campsites} position={this.props.position} />
        </div>
      </div>
    )
  }
}

ParkDetail.propTypes = {
  park: PropTypes.shape({
    description: PropTypes.string,
    longName: PropTypes.string,
    campsites: PropTypes.array
  }).isRequired,
  position: PropTypes.object
}
